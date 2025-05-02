function NewsCarousel() {
    const news = [
      {
        title: "Visa deadlines approaching",
        desc: "Make sure to apply for your extension before May 30.",
        image: "https://source.unsplash.com/random/400x200?travel",
      },
      {
        title: "New student discounts available",
        desc: "Check out updated deals for public transport & food.",
        image: "https://source.unsplash.com/random/400x200?student",
      },
      {
        title: "Upcoming community events",
        desc: "Join local student meetups and career networking fairs.",
        image: "https://source.unsplash.com/random/400x200?event",
      },
    ];
  
    return (
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-primary mb-5">Latest News & Info</h2>
        <div className="flex gap-4 overflow-x-auto scroll-snap-x snap-x snap-mandatory scrollbar-hide">
          {news.map((item, index) => (
            <div
              key={index}
              className="min-w-[300px] max-w-[320px] snap-start bg-white border rounded-lg shadow-md overflow-hidden"
            >
              <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-text mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default NewsCarousel;
  