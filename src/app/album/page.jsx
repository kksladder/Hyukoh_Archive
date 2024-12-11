// app/data/albums.js
export const albums = [
  {
    id: "AAA",
    title: "Young Man",
    imageUrl: "/images/components/AAA.jpg",
    releaseDate: "2024",
    type: "Anniversary Edition"
  },

];

// app/components/Header.jsx
export default function Header({ showBack = false, onBack }) {
  return (
    <header className="fixed w-full top-0 z-50 bg-black/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
        {showBack && (
          <button
            onClick={onBack}
            className="mr-4 hover:text-gray-300"
          >
            ←
          </button>
        )}
        <h1 className="text-2xl font-bold tracking-wider">ODESZA</h1>
        <div className="ml-auto">
          <button className="hover:text-gray-300">
            Login
          </button>
        </div>
      </div>
    </header>
  );
}

// app/album/page.jsx
import Link from 'next/link';
// import { albums } from '../data/albums';
// import Header from '../components/Header';

export default function AlbumList() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {albums.map((album) => (
              <Link
                key={album.id}
                href={`/album/${album.id}`}
                className="group relative aspect-square bg-gray-900 overflow-hidden rounded-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gray-800" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform z-20">
                  <h3 className="text-sm font-medium line-clamp-2">{album.title}</h3>
                  {album.releaseDate && (
                    <p className="text-xs text-gray-300 mt-1">{album.releaseDate}</p>
                  )}
                  {album.type && (
                    <p className="text-xs text-gray-400">{album.type}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// app/album/[id]/page.jsx
'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { albums } from '../../data/albums';
import Header from '../../components/Header';

export default function AlbumDetail({ params }) {
  const router = useRouter();
  const { id } = params;
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const foundAlbum = albums.find(a => a.id === id);
    if (foundAlbum) {
      setAlbum(foundAlbum);
    }
  }, [id]);

  if (!album) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header showBack={true} onBack={() => router.back()} />

      <main className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gray-800" />
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">{album.title}</h2>
              {album.releaseDate && (
                <p className="text-gray-400 mb-6">Released {album.releaseDate}</p>
              )}

              {/* Physical Format */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">PHYSICAL</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-800 rounded">
                    <span>3LP (VINYL)</span>
                    <span>£29.99</span>
                    <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors">
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Digital Format */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">DIGITAL</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-800 rounded">
                    <span>MP3</span>
                    <span>£5.99</span>
                    <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors">
                      Add
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-800 rounded">
                    <span>FLAC</span>
                    <span>£7.99</span>
                    <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// app/layout.jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black">
        {children}
      </body>
    </html>
  );
}
