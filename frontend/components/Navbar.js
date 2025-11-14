import Link from 'next/link';
import {React, useEffect , useState } from 'react';

const Navbar = () => {
    const [isloginedin, setIsloginedin] = useState();
    const [user, setUser] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);

   useEffect(() => {
     const isloginedin = localStorage.getItem('isLoggedIn');
        setIsloginedin(isloginedin);

     // Get user data from localStorage
     const userData = localStorage.getItem('user');
     if (userData) {
       try {
         setUser(JSON.parse(userData));
       } catch (error) {
         console.error('Error parsing user data:', error);
       }
     }
     // This will re-render the component when localStorage changes
   }, []);


    const handlelogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        localStorage.setItem('isLoggedIn', 'false');
        setUser(null);
        window.location.href = '/';
    }
    
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🎤</span>
              <span className="font-bold text-xl text-gray-800">Speech2Text</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="#features"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              About
            </Link>
            
            {isloginedin === 'true' ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <span>{user ? user.name : 'User'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">{user ? user.name : 'User'}</p>
                      <p className="text-sm text-gray-500">{user ? user.email : ''}</p>
                    </div>
                    <Link
                      href="/userprofile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handlelogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
               <div className="flex space-x-2">
               <a
              href="Login"

              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Login
            </a>

            <a

                href="Register"

                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                Register
                </a>
                </div>




            )}
           
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
