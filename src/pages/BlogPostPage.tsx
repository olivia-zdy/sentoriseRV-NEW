import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import PageMeta from "@/components/PageMeta";
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, List, ChevronRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Extract headings from content for TOC
const extractHeadings = (content: string): { id: string; text: string; level: number }[] => {
  const lines = content.split('\n');
  const headings: { id: string; text: string; level: number }[] = [];
  
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('### ')) {
      const text = trimmed.slice(4);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      headings.push({ id, text, level: 3 });
    } else if (trimmed.startsWith('## ')) {
      const text = trimmed.slice(3);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      headings.push({ id, text, level: 2 });
    }
  });
  
  return headings;
};

// Table of Contents Component
const TableOfContents = ({ 
  headings, 
  activeId 
}: { 
  headings: { id: string; text: string; level: number }[];
  activeId: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Mobile TOC Toggle */}
      <div className="lg:hidden sticky top-20 z-30 mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-card border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <List className="w-4 h-4" />
            Table of Contents
          </span>
          <ChevronRight className={cn("w-4 h-4 transition-transform", isOpen && "rotate-90")} />
        </button>
        
        {isOpen && (
          <nav className="mt-2 p-4 bg-card border border-border rounded-xl">
            <ul className="space-y-2">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block text-sm transition-colors hover:text-primary",
                      heading.level === 3 && "pl-4",
                      activeId === heading.id ? "text-primary font-medium" : "text-muted-foreground"
                    )}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop TOC Sidebar */}
      <aside className="hidden lg:block sticky top-24 self-start w-64 shrink-0">
        <div className="p-4 bg-card border border-border rounded-xl">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
            <List className="w-4 h-4" />
            Table of Contents
          </h4>
          <nav>
            <ul className="space-y-2">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    className={cn(
                      "block text-sm transition-colors hover:text-primary border-l-2 py-1",
                      heading.level === 3 && "pl-4",
                      heading.level === 2 && "pl-3",
                      activeId === heading.id 
                        ? "text-primary font-medium border-primary" 
                        : "text-muted-foreground border-transparent hover:border-primary/50"
                    )}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === id);
  const [activeHeadingId, setActiveHeadingId] = useState("");

  const headings = useMemo(() => {
    return post ? extractHeadings(post.content) : [];
  }, [post]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Intersection Observer for active heading tracking
  useEffect(() => {
    if (!post || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -70% 0px', threshold: 0 }
    );

    // Observe all heading elements
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [post, headings]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <AnnouncementBar />
        <Header />
        <main className="section-padding">
          <div className="container-custom text-center">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
            <Button onClick={() => navigate("/blog")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title={`${post.title} | Sentorise Blog`}
        description={post.excerpt}
      />
      <AnnouncementBar />
      <Header />
      <main>
        {/* Hero Image */}
        <div className="relative h-[40vh] md:h-[50vh] bg-muted overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        {/* Content */}
        <article className="container-custom -mt-24 relative z-10">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6 max-w-4xl">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-primary">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{post.title}</span>
          </nav>

          {/* Article Header */}
          <div className="bg-card rounded-2xl border border-border p-6 md:p-10 mb-8 max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full">
                {post.category}
              </span>
              {post.featured && (
                <span className="px-3 py-1 text-xs font-semibold text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 rounded-full">
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t border-border pt-6">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </span>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 hover:text-primary transition-colors ml-auto"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>

          {/* Article Content with TOC */}
          <div className="flex gap-8 items-start">
            {/* Main Content */}
            <div className="flex-1 min-w-0 max-w-4xl">
              {/* Mobile TOC */}
              <TableOfContents headings={headings} activeId={activeHeadingId} />
              
              <div className="bg-card rounded-2xl border border-border p-6 md:p-10 mb-8">
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none
                    prose-headings:font-bold prose-headings:text-foreground prose-headings:scroll-mt-24
                    prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                    prose-p:text-muted-foreground prose-p:leading-relaxed
                    prose-strong:text-foreground
                    prose-ul:text-muted-foreground
                    prose-ol:text-muted-foreground
                    prose-li:my-1
                    prose-table:border prose-table:border-border
                    prose-th:bg-muted prose-th:p-3 prose-th:text-left prose-th:font-semibold
                    prose-td:p-3 prose-td:border-t prose-td:border-border"
                  dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-12">
                <Tag className="w-4 h-4 text-muted-foreground" />
                {post.tags.map(tag => (
                  <Link
                    key={tag}
                    to={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              {/* Back Link */}
              <div className="mb-12">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to all articles
                </Link>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    Related Articles
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map(relatedPost => (
                      <Link
                        key={relatedPost.id}
                        to={`/blog/${relatedPost.id}`}
                        className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-colors"
                      >
                        <div className="aspect-video bg-muted overflow-hidden">
                          <img
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {relatedPost.readTime} min read
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Desktop TOC Sidebar */}
            <TableOfContents headings={headings} activeId={activeHeadingId} />
          </div>
        </article>

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

// Improved markdown-like content formatter
const formatContent = (content: string): string => {
  const lines = content.trim().split('\n');
  let html = '';
  let inList = false;
  let inTable = false;
  let isFirstTableRow = true;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      if (inTable) {
        html += '</tbody></table>\n';
        inTable = false;
        isFirstTableRow = true;
      }
      continue;
    }

    // Headers - add IDs for TOC linking
    if (line.startsWith('### ')) {
      if (inList) { html += '</ul>\n'; inList = false; }
      const text = line.slice(4);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      html += `<h3 id="${id}">${text}</h3>\n`;
      continue;
    }
    if (line.startsWith('## ')) {
      if (inList) { html += '</ul>\n'; inList = false; }
      const text = line.slice(3);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      html += `<h2 id="${id}">${text}</h2>\n`;
      continue;
    }

    // Table rows
    if (line.startsWith('|') && line.endsWith('|')) {
      const cells = line.slice(1, -1).split('|').map(c => c.trim());
      
      // Skip separator row
      if (cells.every(c => /^[-:]+$/.test(c))) {
        continue;
      }

      if (!inTable) {
        html += '<table class="w-full border-collapse border border-border my-4"><thead>';
        inTable = true;
        isFirstTableRow = true;
      }

      if (isFirstTableRow) {
        html += `<tr>${cells.map(c => `<th class="bg-muted p-3 text-left font-semibold border border-border">${formatInlineText(c)}</th>`).join('')}</tr></thead><tbody>`;
        isFirstTableRow = false;
      } else {
        html += `<tr>${cells.map(c => `<td class="p-3 border border-border">${formatInlineText(c)}</td>`).join('')}</tr>`;
      }
      continue;
    }

    // Unordered list
    if (line.startsWith('- ')) {
      if (!inList) {
        html += '<ul class="list-disc pl-6 my-4 space-y-2">\n';
        inList = true;
      }
      html += `<li>${formatInlineText(line.slice(2))}</li>\n`;
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      if (!inList) {
        html += '<ol class="list-decimal pl-6 my-4 space-y-2">\n';
        inList = true;
      }
      html += `<li>${formatInlineText(line.replace(/^\d+\.\s/, ''))}</li>\n`;
      continue;
    }

    // Close lists before paragraph
    if (inList) {
      html += '</ul>\n';
      inList = false;
    }

    // Paragraph
    html += `<p class="my-4">${formatInlineText(line)}</p>\n`;
  }

  // Close any open tags
  if (inList) html += '</ul>\n';
  if (inTable) html += '</tbody></table>\n';

  return html;
};

// Format inline elements (bold, italic, etc.)
const formatInlineText = (text: string): string => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm">$1</code>');
};

export default BlogPostPage;
