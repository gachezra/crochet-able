export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-8 rounded-tl-2xl rounded-tr-2xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Cozy Crochets</h3>
              <p className="text-gray-400">
                Handmade crochet items made with love and care for your home and loved ones.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Contacts</h3>
              <p className="text-gray-400">Email: hello@cozycrochets.com</p>
              <p className="text-gray-400">Phone: + 123 456 789 123</p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Cozy Crochets. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }