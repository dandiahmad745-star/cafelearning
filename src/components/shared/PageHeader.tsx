import type { FC, ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  description?: string | ReactNode;
};

const PageHeader: FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="py-8 md:py-12 bg-card">
        <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-center mb-4 text-primary">
                {title}
            </h1>
            {description && (
                <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
                {description}
                </p>
            )}
        </div>
    </div>
  );
};

export default PageHeader;
