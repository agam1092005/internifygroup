"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar, NavBody, NavItems, NavbarLogo, NavbarButton } from "@/components/ui/resizable-navbar";

function getCookie(name: string) {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export default function DashboardPage() {
  const router = useRouter();
  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      router.replace('/');
    }
  }, [router]);

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/;';
    router.replace('/');
  };

  // Helper to slugify course names
  function slugify(text: string) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  return (
    <>
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems
            items={[
              { name: "View payments", link: "/payments" },
            ]}
          />
          <div className="ml-auto">
            <NavbarButton as="button" onClick={handleLogout} variant="secondary">
              Logout
            </NavbarButton>
          </div>
        </NavBody>
      </Navbar>
      <div className="min-h-screen bg-white flex flex-col items-center justify-center w-full mt-10">
        <h1 className="text-3xl font-bold mb-8 text-black text-center w-full">Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4 mb-6">
          {[
            {
              name: "Computer Science (General)",
              desc: "Foundational concepts for all tech careers.",
              price: 1499,
              discount: 999,
              image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
            },
            {
              name: "Backend",
              desc: "Learn server-side logic, APIs, and databases.",
              price: 1199,
              discount: 899,
              image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80"
            },
            {
              name: "Frontend",
              desc: "Master UI/UX and web interfaces.",
              price: 1199,
              discount: 899,
              image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
            },
            {
              name: "DevOps",
              desc: "Automate, deploy, and scale applications.",
              price: 1499,
              discount: null,
              image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
            },
            {
              name: "Machine Learning",
              desc: "Build intelligent systems and models.",
              price: 1999,
              discount: 1499,
              image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
            },
            {
              name: "AI",
              desc: "Explore artificial intelligence fundamentals.",
              price: 1999,
              discount: 1499,
              image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
            },
            {
              name: "Deep Learning",
              desc: "Dive into neural networks and advanced AI.",
              price: 1999,
              discount: 1749,
              image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"
            }
          ].map((course) => (
            <div
              key={course.name}
              className="border border-gray-300 rounded-lg p-3 bg-white flex flex-col items-start w-full min-w-[300px] max-w-[500px] cursor-pointer hover:shadow-md transition"
              tabIndex={0}
              role="button"
              onClick={() => router.push(`/courses/${slugify(course.name)}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') router.push(`/courses/${slugify(course.name)}`);
              }}
            >
              <div className="w-full aspect-[2/1] rounded mb-3 overflow-hidden bg-gray-800">
                <img src={course.image} alt={course.name + ' image'} className="w-full h-full object-cover" />
              </div>
              <span className="font-semibold text-lg text-black mb-2">{course.name}</span>
              <div className="flex items-center mb-1">
                {course.discount ? (
                  <>
                    <span className="text-gray-400 line-through mr-2">₹{course.price}</span>
                    <span className="text-2xl font-bold text-black">₹{course.discount}</span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-black">₹{course.price}</span>
                )}
              </div>
              <span className="text-xs text-gray-500 text-left">{course.desc}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4 text-center w-full max-w-2xl">
          Your scores in these courses will be evaluated to determine internship opportunities and placements.
        </p>
      </div>
    </>
  );
} 