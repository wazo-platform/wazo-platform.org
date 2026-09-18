import type { PropNavigationLink } from '@docusaurus/plugin-content-docs';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import DocPaginator from '@theme/DocPaginator';

type CrossPluginLinks = {
  pagination_next_link?: PropNavigationLink;
  pagination_prev_link?: PropNavigationLink;
};

/* Docusaurus builds prev/next from the sidebar, and a sidebar only reaches the
   docs of its own plugin instance -- so nothing in /docs can point at a page
   of the UC documentation. `pagination_next_link` / `pagination_prev_link`
   front matter ({ title, permalink }) fills that gap; everything else falls
   back to the paginator the theme would have rendered. */
const DocItemPaginator = () => {
  const { metadata, frontMatter } = useDoc();
  const { pagination_next_link: next, pagination_prev_link: previous } =
    frontMatter as CrossPluginLinks;

  return (
    <DocPaginator
      previous={previous ?? metadata.previous}
      next={next ?? metadata.next}
    />
  );
};

export default DocItemPaginator;
