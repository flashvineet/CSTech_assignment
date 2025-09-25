import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const { user } = useAuth();

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        <div className="text-sm text-muted-foreground">
          Welcome, {user?.email}
        </div>
      </div>
    </header>
  );
};