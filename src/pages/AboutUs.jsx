import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

// Icons (using simple SVG components)
const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const DribbbleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm9.847 7.929c-.564-.271-1.212-.407-1.857-.407-.653 0-1.301.139-1.86.41.167.456.312.918.436 1.386.521-.1 1.058-.148 1.592-.148.539 0 1.075.049 1.589.151.125-.469.27-.932.437-1.392zm-6.011 1.795c.642-.384 1.38-.619 2.13-.619.748 0 1.486.234 2.127.617-.307.742-.662 1.46-1.061 2.15-.695-.209-1.432-.317-2.171-.317-.734 0-1.465.107-2.156.314-.402-.688-.758-1.404-1.069-2.145zm-3.873.922c.235-.02.471-.03.708-.03.748 0 1.486.125 2.208.366-.329.695-.626 1.409-.886 2.139-.752-.271-1.563-.42-2.383-.42-.24 0-.48.011-.717.032.253-.729.537-1.442.87-2.087zm-2.123 3.708c.767 0 1.518.119 2.242.345-.253.654-.483 1.319-.684 1.996-1.065-.158-2.16-.158-3.225 0-.201-.677-.431-1.342-.684-1.995.724-.227 1.475-.346 2.241-.346zm-3.582 2.312c.559 0 1.124.061 1.68.183-.062.671-.093 1.347-.093 2.027 0 .684.031 1.361.093 2.033-2.186.486-3.88 1.8-4.678 3.548-1.162-1.835-1.833-4.036-1.833-6.365 0-2.052.556-3.976 1.523-5.618.981.768 2.122 1.299 3.308 1.299zm10.347 2.109c.201.677.431 1.342.684 1.995-.724.227-1.475.346-2.241.346-.767 0-1.518-.119-2.242-.345.253-.654.483-1.319.684-1.996 1.065.158 2.16.158 3.225 0zm-4.698 3.045c.26.73.557 1.444.886 2.139-.722.241-1.46.366-2.208.366-.237 0-.473-.01-.708-.03-.333.645-.617 1.358-.87 2.087.237.021.477.032.717.032.82 0 1.631-.149 2.383-.42-.26-.73-.557-1.444-.886-2.139zm-3.054 3.929c.692.207 1.422.314 2.156.314.739 0 1.476-.108 2.171-.317.399.69.754 1.408 1.061 2.15-.641.383-1.379.617-2.127.617-.75 0-1.488-.235-2.13-.619-.311-.741-.666-1.457-1.069-2.145zm-3.308-1.299c.798 1.748 2.492 3.062 4.678 3.548.062-.672.093-1.349.093-2.033 0-.68-.031-1.356-.093-2.027-.556-.122-1.121-.183-1.68-.183-1.186 0-2.327.531-3.308 1.299-.967 1.642-1.523 3.566-1.523 5.618 0 2.329.671 4.53 1.833 6.365-.798-1.748-2.492-3.062-4.678-3.548-.062-.672-.093-1.349-.093-2.033 0-2.052.556-3.976 1.523-5.618.981-.768 2.122-1.299 3.308-1.299z" />
  </svg>
);

// Placeholder images using placeholder.com service
const placeholderImage = (width, height, text = '') => 
  `https://via.placeholder.com/${width}x${height}.png/0077b5/ffffff?text=${encodeURIComponent(text)}`;

const founders = [
  {
    id: 1,
    name: "Alex Chen",
    title: "CEO & Co-founder",
    bio: "Former product lead at Google with 10+ years of experience in scaling tech products.",
    image: placeholderImage(400, 400, "Founder 1"),
    socialLinks: [
      { name: "Twitter", url: "#", icon: TwitterIcon },
      { name: "LinkedIn", url: "#", icon: LinkedInIcon },
    ],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    title: "CTO & Co-founder",
    bio: "Ex-engineering director at Amazon, specializing in cloud infrastructure and AI systems.",
    image: placeholderImage(400, 400, "Founder 2"),
    socialLinks: [
      { name: "Twitter", url: "#", icon: TwitterIcon },
      { name: "GitHub", url: "#", icon: GitHubIcon },
    ],
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    title: "CPO & Co-founder",
    bio: "Design leader from Airbnb, focused on creating intuitive user experiences.",
    image: placeholderImage(400, 400, "Founder 3"),
    socialLinks: [
      { name: "Dribbble", url: "#", icon: DribbbleIcon },
      { name: "LinkedIn", url: "#", icon: LinkedInIcon },
    ],
  },
];

const milestones = [
  {
    id: 1,
    date: "June 2020",
    title: "Company founded",
    description: "Started in a small garage with just 3 people and a big vision.",
  },
  {
    id: 2,
    date: "January 2021",
    title: "Seed funding round",
    description: "Raised $2M from top-tier investors to build our first product.",
  },
  {
    id: 3,
    date: "August 2021",
    title: "First product launch",
    description: "Released our MVP to early adopters with great reception.",
  },
  {
    id: 4,
    date: "May 2022",
    title: "Series A funding",
    description: "Secured $15M to expand our team and accelerate development.",
  },
  {
    id: 5,
    date: "Present",
    title: "Scaling globally",
    description: "Now serving customers in 15 countries with 50+ employees.",
  },
];

const teamStats = [
  { id: 1, value: "50+", label: "Team members" },
  { id: 2, value: "12", label: "Countries" },
  { id: 3, value: "42%", label: "Women" },
  { id: 4, value: "15", label: "Languages spoken" },
];

const AboutUs = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Custom hook for intersection observer
  const useAnimatedSection = () => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });
    return { ref, inView };
  };

  return (
    <div className="bg-white">
      {/* Hero Section with Mission Statement */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Building the future, <span className="text-indigo-600">together</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              We're on a mission to transform how businesses operate through
              innovative technology and human-centered design.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-lg hover:bg-indigo-700 transition-colors"
            >
              Join our journey
            </motion.button>
          </motion.div>

          {/* Animated decorative elements */}
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-10 w-8 h-8 rounded-full bg-indigo-200 opacity-70"
          />
          <motion.div
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute bottom-1/3 right-12 w-6 h-6 rounded-full bg-blue-200 opacity-70"
          />
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={item} className="text-3xl font-bold text-gray-900 mb-4">
              Meet the visionaries
            </motion.h2>
            <motion.p variants={item} className="text-gray-600 max-w-2xl mx-auto">
              Our founders bring decades of combined experience from top tech companies
              and a shared passion for solving real-world problems.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.id}
                variants={item}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{founder.name}</h3>
                  <p className="text-indigo-600 mb-2">{founder.title}</p>
                  <p className="text-gray-600 mb-4">{founder.bio}</p>
                  <div className="flex space-x-4">
                    {founder.socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        className="text-gray-400 hover:text-indigo-600 transition-colors"
                        aria-label={link.name}
                      >
                        <link.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our journey so far</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to shaping the future of our industry.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-indigo-200 transform -translate-x-1/2" />

            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              const { ref, inView } = useAnimatedSection();

              return (
                <div
                  key={milestone.id}
                  ref={ref}
                  className={`relative mb-12 md:flex ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center`}
                >
                  {/* Date */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className={`md:w-1/2 ${isEven ? "md:pr-12 text-right" : "md:pl-12"} mb-6 md:mb-0`}
                  >
                    <div className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg shadow">
                      {milestone.date}
                    </div>
                  </motion.div>

                  {/* Milestone card */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`md:w-1/2 ${isEven ? "md:pl-12" : "md:pr-12"}`}
                  >
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </motion.div>

                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 w-4 h-4 bg-indigo-600 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Photo Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our amazing team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A diverse group of talented individuals united by a common purpose.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-10"
          >
            <img
              src={placeholderImage(1200, 500, "Team Photo")}
              alt="Our team working together"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end">
              <div className="p-8 text-white">
                <p className="text-lg mb-2">50+ team members across 12 countries</p>
                <h3 className="text-2xl font-bold">One global mission</h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {teamStats.map((stat, index) => (
              <motion.div
                key={stat.id}
                variants={item}
                className="bg-gray-50 p-6 rounded-xl text-center"
              >
                <p className="text-4xl font-bold text-indigo-600 mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Want to be part of our story?</h2>
            <p className="text-indigo-100 mb-8 text-xl">
              We're always looking for passionate people to join our team and help
              shape the future.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
              >
                View open positions
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Contact us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;