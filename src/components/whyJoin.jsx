const features = [
  {
    title: "Find Startup Ideas",
    description:
      "Explore innovative startups and discover exciting ideas created by passionate founders.",
    icon: "🚀",
  },
  {
    title: "Build Your Team",
    description:
      "Connect with developers, designers, and professionals to create powerful teams.",
    icon: "🤝",
  },
  {
    title: "Grow Together",
    description:
      "Collaborate with talented people and turn startup dreams into reality.",
    icon: "📈",
  },
];

const WhyJoin = () => {
  return (
    <div className="py-20 dark-bg">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-[#00d3f2] font-semibold text-5xl">Why VentureConnect</p>

          <h2 className="text-3xl md:text-4xl font-bold text-[#d35e28] mt-2">
            Build, Connect & Create Together
          </h2>

          <p className="text-gray-500 max-w-xl mx-auto mt-4">
            A simple platform where founders and talented people meet to build the next big thing.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-[#00142c] rounded-2xl p-7 text-center hover:-translate-y-2 transition duration-300"
            >

              <div className="w-16 h-16 mx-auto rounded-full bg-[#00d3f2] flex items-center justify-center text-3xl">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-white mt-5">
                {item.title}
              </h3>

              <p className="text-gray-300 mt-3 leading-6">
                {item.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default WhyJoin;