import { Quote, Star } from "lucide-react";

const testimonials = [
    {
        name: "Arafat Rahman",
        role: "Startup Founder",
        image: "https://i.pravatar.cc/150?img=12",
        review:
            "VentureConnect helped me build my startup team. I found passionate developers who believed in my idea.",
    },
    {
        name: "Nabila Islam",
        role: "Frontend Developer",
        image: "https://i.pravatar.cc/150?img=47",
        review:
            "A great place for developers to discover real startup opportunities and work with talented founders.",
    },
    {
        name: "Tanvir Ahmed",
        role: "Marketing Specialist",
        image: "https://i.pravatar.cc/150?img=33",
        review:
            "The platform made collaboration easier. I connected with startups that match my skills and goals.",
    },
];

const Testimonials = () => {
    return (
        <div className="py-20 bg-[#00142c] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}
                <div className="text-center mb-14">
                    <p className="text-[#00d3f2] font-semibold mb-3">Community Voices</p>

                    <h2 className="text-3xl md:text-5xl font-bold text-white">
                        What People Say About{" "}
                        <span className="text-[#00d3f2]">VentureConnect</span>
                    </h2>

                    <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
                        Founders and professionals are creating meaningful connections and building the next generation of startups.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {testimonials.map((item, index) => (
                        <div key={index} className="relative bg-white rounded-3xl p-8 shadow-xl hover:-translate-y-2 transition-all duration-300">

                            {/* Quote Icon */}
                            <div className="absolute -top-5 left-8 w-12 h-12 rounded-full bg-[#00d3f2] flex items-center justify-center">
                                <Quote size={22} className="text-[#00142c]" />
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} size={18} className="text-[#00d3f2] fill-[#00d3f2]" />
                                ))}
                            </div>

                            {/* Review */}
                            <p className="text-gray-600 leading-7">"{item.review}"</p>

                            {/* User Info */}
                            <div className="flex items-center gap-4 mt-8">
                                <img src={item.image} alt={item.name} className="w-14 h-14 rounded-full object-cover border-2 border-[#00d3f2]" />

                                <div>
                                    <h3 className="font-bold text-[#00142c]">{item.name}</h3>
                                    <p className="text-sm text-gray-500">{item.role}</p>
                                </div>
                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
};

export default Testimonials;