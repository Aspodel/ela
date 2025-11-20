export function Footer() {
  const sections = [
    {
      title: 'Product',
      links: ['Features', 'Pricing', 'Demo'],
    },
    {
      title: 'Company',
      links: ['About', 'Blog', 'Careers'],
    },
    {
      title: 'Legal',
      links: ['Terms', 'Privacy'],
    },
    {
      title: 'Support',
      links: ['Help Center', 'Contact'],
    },
  ];

  return (
    <footer className='bg-white dark:bg-card border-border/80 border-t'>
      <div className='max-w-7xl mx-auto px-6 py-8'>
        <div className='flex flex-col md:flex-row md:justify-between gap-6'>
          <div>
            <h4 className='font-bold'>ELA</h4>
            <p className='text-sm text-muted-foreground font-medium mt-2'>
              Learn languages with AI-guided practice.
            </p>
          </div>

          <div className='grid grid-cols-2 gap-6 md:grid-cols-4'>
            {sections.map(({ title, links }) => (
              <div key={title}>
                <h5 className='font-medium'>{title}</h5>
                <ul className='mt-2 text-sm text-muted-foreground font-medium space-y-1'>
                  {links.map((label) => (
                    <li key={label}>
                      <a href='#'>{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-8 text-sm text-muted-foreground text-center font-medium'>
          © {new Date().getFullYear()}{' '}
          <a
            href='https://github.com/Aspodel'
            target='_blank'
            rel='noopener noreferrer'
            className='font-bold hover:underline underline-offset-4'
          >
            Aspodel
          </a>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
}
