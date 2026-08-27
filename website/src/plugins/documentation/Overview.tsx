import { Icon } from '@iconify/react';
import PageHero from '@site/src/components/PageHero';
import Layout from '@theme/Layout';
import Mermaid from '@theme/Mermaid';
import { Children } from 'react';
import type { ComponentProps, ReactElement, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';

import type { DocModule } from './builder';
import './documentation.css';

type Props = {
  route: {
    customData?: {
      pageName: string;
      module: DocModule;
      overview: string;
    };
  };
};

const flatten = (node: ReactNode): string => {
  if (typeof node === 'string') {
    return node;
  }
  if (Array.isArray(node)) {
    return node.map(flatten).join('');
  }
  if (node && typeof node === 'object' && 'props' in node) {
    return flatten(
      (node as { props: { children?: ReactNode } }).props.children,
    );
  }
  return '';
};

// same slugs as the previous site so existing #anchors keep working
const slugify = (text: string) => text.toLowerCase().replace(/\W/g, '-');

const headingComponent =
  (Tag: 'h2' | 'h3' | 'h4' | 'h5' | 'h6') =>
  ({ children }: { children?: ReactNode }) => (
    <Tag id={slugify(flatten(children))}>{children}</Tag>
  );

const isMermaidBlock = (children: ReactNode) => {
  const [child] = Children.toArray(children) as ReactElement<{
    className?: string;
  }>[];
  return child?.props?.className === 'language-mermaid';
};

const markdownComponents = {
  h1: () => null,
  h2: headingComponent('h2'),
  h3: headingComponent('h3'),
  h4: headingComponent('h4'),
  h5: headingComponent('h5'),
  h6: headingComponent('h6'),
  // a mermaid diagram must not stay wrapped in the <pre> react-markdown emits,
  // or infima styles it as a grey code sample
  pre: ({ children }: ComponentProps<'pre'>) =>
    isMermaidBlock(children) ? <>{children}</> : <pre>{children}</pre>,
  // `node` is react-markdown's own prop, it must not reach the DOM
  code: ({
    className,
    children,
    node: _node,
    ...props
  }: ComponentProps<'code'> & { node?: unknown }) => {
    if (className === 'language-mermaid') {
      return <Mermaid value={String(children).trim()} />;
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

const getMenuEntries = (overview: string) => {
  const withoutCode = overview.replace(/```[\s\S]*?```/g, '');
  const entries: { level: number; text: string }[] = [];

  for (const line of withoutCode.split('\n')) {
    const match = line.match(/^(#{2,3})\s+(.*)$/);
    if (match) {
      entries.push({ level: match[1].length, text: match[2].trim() });
    }
  }

  return entries;
};

const Overview = ({ route }: Props) => {
  const { module, overview } = route?.customData || {};

  const menuEntries = getMenuEntries(overview || '');

  return (
    <Layout title={`Documentation: ${module.title}`}>
      <PageHero title={module.title} description={module.description} />
      <div className="container doc-overview">
        <aside className="doc-overview__menu">
          <nav>
            {menuEntries.map(({ level, text }) => (
              <a
                key={text}
                href={`#${slugify(text)}`}
                className={
                  level === 2
                    ? 'doc-overview__menu-h2'
                    : 'doc-overview__menu-h3'
                }
              >
                {text}
              </a>
            ))}
          </nav>
        </aside>
        <main className="doc-overview__content markdown">
          <ReactMarkdown components={markdownComponents}>
            {overview || ''}
          </ReactMarkdown>
          {module.repositoryLink !== false && module.repository && (
            <p>
              <a href={`https://github.com/wazo-platform/${module.repository}`}>
                <Icon icon="fa-brands:github" /> {module.repository}
              </a>
            </p>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default Overview;
