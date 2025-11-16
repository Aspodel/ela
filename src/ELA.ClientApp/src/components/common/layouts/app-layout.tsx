import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';

type AppLayoutProps = {
  children?: React.ReactNode;
};

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className='min-h-screen flex flex-col gap-8 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto'>
      <Header />
      <main className='flex-1 flex flex-col'>{children}</main>
      <Footer />
    </div>
  );
};