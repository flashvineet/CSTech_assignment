import { NavLink } from 'react-router-dom';
import { Home, Users, Upload, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Agents', href: '/agents', icon: Users },
  { name: 'Upload', href: '/upload', icon: Upload },
];

export const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="w-64 bg-card border-r border-border h-screen">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-primary">Admin Panel</h2>
      </div>
      
      <nav className="mt-6">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary border-r-2 border-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
        
        <button
          onClick={logout}
          className="flex items-center w-full px-6 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </nav>
    </div>
  );
};