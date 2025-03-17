"use client";
import Link from "next/link";
import Image from "next/image";
// import back1 from "./images/back1.png";
import back3 from "./images/back3.png";

export default function Home() {
  return (
    <div>
      {/* <section
        className="min-h-screen bg-white flex flex-col items-center justify-center p-8"
        style={{
          backgroundImage: `url(${back1.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      > */}
        {/* <h1 className="text-5xl  font-bold mb-6 animate-fade-in">
        Welcome to Mega City Cab
      </h1>
      <p className="text-xl mb-6 text-green-800 text-center animate-slide-in">
        Providing reliable cab service since 2024. We offer the best cab
        services in the city with professional drivers and well-maintained
        vehicles.
      </p>
      <Link href="/cabs" className="btn btn-primary animate-bounce">
        Book a Cab Now
      </Link> */}
      {/* </section> */}
      <div className="hero  min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Image
             
            src={back3}
            alt="Background image"
            className=" w-[1000px] rounded-lg "
          />
          <div>
            <h1 className="text-5xl font-bold">Welcome to Mega City Cab</h1>
            <p className="py-6">
            Providing reliable cab service since 2024. We offer the best cab
            services in the city with professional drivers and well-maintained
            vehicles.
            </p>
            <Link href="/cabs" className="btn btn-primary animate-bounce">
        Book a Cab Now
      </Link> 
          </div>
        </div>
      </div>

      {/* Second Section: Feedback and Trust Certificates */}
      <section className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center justify-center p-8">
        <h2 className="text-4xl font-bold mb-6 animate-fade-in">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg animate-slide-in">
            <p className="text-lg mb-4">
              &quot;Excellent service! The driver was professional and the cab
              was clean and comfortable.&quot;
            </p>
            <div className="flex flex-row gap-3 items-center">
              <div className="avatar">
                <div className="w-10 rounded">
                  <Image
                    width={200}
                    height={200}
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="Tailwind-CSS-Avatar-component"
                  />
                </div>
              </div>
              <p className="font-bold">- John Doe</p>
            </div>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg animate-slide-in">
            <p className="text-lg mb-4">
              &quot;I always use Mega City Cab for my airport transfers. They
              are always on time and reliable.&quot;
            </p>
            <div className="flex flex-row gap-3 items-center">
              <div className="avatar">
                <div className="w-10 rounded">
                  <Image
                    width={200}
                    height={200}
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="Tailwind-CSS-Avatar-component"
                  />
                </div>
              </div>
              <p className="font-bold">- John Doe</p>
            </div>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg animate-slide-in">
            <p className="text-lg mb-4">
              &quot;Great service and affordable prices. Highly recommend! Lets
              Book book your cab now&quot;
            </p>
            <div className="flex flex-row gap-3 items-center">
              <div className="avatar">
                <div className="w-10 rounded">
                  <Image
                    width={200}
                    height={200}
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="Tailwind-CSS-Avatar-component"
                  />
                </div>
              </div>
              <p className="font-bold">- John Doe</p>
            </div>
          </div>
        </div>
        <h3 className="text-3xl font-bold mt-12 mb-6 animate-fade-in">
          Our Trust Certificates
        </h3>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
              <Image
                width={600}
                height={200}
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Card Title</h2>
              <p>
                A card component has a figure, a body part, and inside body
                there are title and actions parts
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
              <Image
                width={600}
                height={200}
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Card Title</h2>
              <p>
                A card component has a figure, a body part, and inside body
                there are title and actions parts
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
              <Image
                width={600}
                height={200}
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Card Title</h2>
              <p>
                A card component has a figure, a body part, and inside body
                there are title and actions parts
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Third Section: Contact Form */}
      <section className="min-h-screen  text-gray-800 flex flex-col items-center justify-center p-5">
        <h2 className="text-4xl font-bold mb-6 animate-fade-in">Contact Us</h2>
        <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg animate-slide-in">
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-lg font-bold mb-2">
              Message
            </label>
            <textarea
              id="message"
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <aside>
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current"
          >
            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <p>
            Mega city Cab Ltd.
            <br />
            Providing reliable cab service since 2024
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </div>
  );
}
