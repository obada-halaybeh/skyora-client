import React from "react";
import { Lock, Plane, Clock, RefreshCw } from "lucide-react";
import TopNav from "../components/layout/TopNav";
import SearchPill from "../components/home/SearchPill";
import BundleCard from "../components/home/BundleCard";
import Footer from "../components/layout/Footer";
import { useState, useEffect } from "react";
import { API } from "../config";

export default function Home() {
  const [searchType, setSearchType] = useState("flights");
  const [where, setWhere] = useState("");
  const [dates, setDates] = useState("");

  const [bundles, setBundles] = useState([]);

  useEffect(() => {
    fetchBundles();
  }, []);

  const fetchBundles = async () => {
    try {
      const res = await fetch(`${API}/bundles`);
      const data = await res.json();
      setBundles(data);
    } catch (err) {
      console.error("Failed to load bundles", err);
    }
  };
  //fixed data idk what to put on here :(
  const destinations = [
    { city: "Dubai", country: "UAE", price: 420, seed: 159 },
    { city: "Paris", country: "France", price: 310, seed: 237 },
    { city: "Tokyo", country: "Japan", price: 680, seed: 26 },
    { city: "New York", country: "USA", price: 290, seed: 164 },
    { city: "Maldives", country: "Maldives", price: 890, seed: 15 },
    { city: "Bali", country: "Indonesia", price: 540, seed: 488 },
  ];

  const trustItems = [
    {
      Icon: Lock,
      title: "Secure Payments",
      desc: "PCI-DSS compliant, 256-bit SSL",
    },
    {
      Icon: Plane,
      title: "Best Price Guarantee",
      desc: "We match any lower fare found",
    },
    {
      Icon: Clock,
      title: "24/7 Support",
      desc: "Always here when you need us",
    },
    {
      Icon: RefreshCw,
      title: "Flexible Changes",
      desc: "Modify or cancel with ease",
    },
  ];

  return (
    <div className="bg-canvas min-h-screen">
      <TopNav />

      <div className="relative h-[420px] sm:h-[560px]">
        <img
          src="https://picsum.photos/seed/542/1440/560"
          alt="hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 sm:gap-8 px-4">
          <div className="text-center">
            <h1 className="text-[32px] sm:text-[44px] md:text-[52px] leading-[1.1] font-extrabold text-white mb-3 [text-shadow:0_2px_12px_rgba(0,0,0,0.25)]">
              Your next adventure
              <br />
              starts here
            </h1>
            <p className="text-base sm:text-lg font-medium text-white/90">
              {" "}
              Flights, hotels and packages to over 500 destinations
            </p>
          </div>
          <SearchPill
            type={searchType}
            setType={setSearchType}
            where={where}
            setWhere={setWhere}
            dates={dates}
            setDates={setDates}
          />
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-16 pt-10 sm:pt-16">
        <section className="mb-10 sm:mb-14">
          <h2 className="text-xl sm:text-[28px] font-bold mb-2">Popular Destinations</h2>
          <p className="text-base text-ash font-medium mb-5 sm:mb-7">
            Trending routes this season
          </p>
          <div className="flex gap-4 sm:gap-5 overflow-x-auto pb-2">
            {destinations.map((d) => (
              <div
                key={d.city}
                onClick={() => setWhere(d.country)}
                className="shrink-0 w-[160px] sm:w-[200px] cursor-pointer"
              >
                <img
                  src={`https://picsum.photos/seed/${d.seed}/200/150`}
                  alt={d.city}
                  className="w-[160px] sm:w-[200px] h-[120px] sm:h-[150px] object-cover rounded-2xl"
                />
                <div className="pt-3">
                  <p className="text-base font-bold">{d.city}</p>
                  <p className="text-[13px] text-ash font-medium">
                    Flights from
                  </p>
                  <p className="text-[15px] font-bold mt-0.5">${d.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 sm:mb-14">
          <h2 className="text-xl sm:text-[28px] font-bold mb-2">Featured Packages</h2>
          <p className="text-base text-ash font-medium mb-5 sm:mb-7">
            {" "}
            Flight + hotel, better together
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {bundles
              .filter((b) => b.status === "Active")
              .slice(0, 3)
              .map((b) => (
                <BundleCard key={b.id} {...b} />
              ))}
          </div>
        </section>

        <section className="bg-cloud rounded-3xl px-5 sm:px-12 py-8 sm:py-10 mb-10 sm:mb-16">
          <h2 className="text-lg sm:text-[22px] font-bold text-center mb-6 sm:mb-8">
            Why book with Skyora?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {trustItems.map((t) => (
              <div key={t.title} className="text-center">
                <t.Icon size={32} className="mx-auto mb-3 text-rausch" />
                <h3 className="text-base font-bold mb-1.5">{t.title}</h3>
                <p className="text-sm text-ash font-medium">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
