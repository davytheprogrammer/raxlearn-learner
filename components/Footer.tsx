import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-12 gap-12 mb-12">
                    <div className="md:col-span-4 space-y-4">
                        <Link href="/" className="text-2xl font-bold text-white">
                            raxlearn
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                            A project-based learning platform for developers. Pick a path, choose your tech stack, and learn by building real applications.
                        </p>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/paths" className="hover:text-white transition-colors">Learning Paths</Link></li>
                            <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">MDN Web Docs</a></li>
                            <li><a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">React Docs</a></li>
                            <li><a href="https://nodejs.org/en/docs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Node.js Docs</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Connect</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter / X</a></li>
                            <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Discord</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">© 2026 raxlearn. All rights reserved.</p>
                    <p className="text-sm text-gray-500">Learn. Build. Succeed.</p>
                </div>
            </div>
        </footer>
    );
}
