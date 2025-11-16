type HeadProps = {
  title?: string;
  description?: string;
};
export const Head = ({ title, description }: HeadProps) => {
  const defaultTitle = 'ELA';
  const defaultDescription = 'Learn Languages Your Way — With Guidance from AI';

  return (
    <>
      <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>
      <meta name='description' content={description || defaultDescription} />
    </>
  );
};
