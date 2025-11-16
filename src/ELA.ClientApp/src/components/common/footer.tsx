export function Footer() {
  return (
    <footer className='flex flex-col md:flex-row md:justify-between items-center md:items-end gap-6 py-4'>
      <div className='hidden md:flex flex-col'>
        <h4 className='font-bold'>ELA</h4>
        <p className='text-sm text-muted-foreground mt-1'>
          Learn languages with AI-guided practice.
        </p>
      </div>

      <div className='text-sm text-muted-foreground font-semibold'>
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
    </footer>
  );
}
