import "./EventCard.css";

const EventCard = ({ title, description, image, bgColor, additionalDate }) => {
  // title과 description 모두 HTML 태그를 허용하도록 설정
  const formattedTitle = title.replace(/\n/g, "<br />");
  const formattedDescription = description.replace(/\n/g, "<br />");

  return (
    <div className="event-card" style={{ backgroundColor: bgColor }}>
      <div className="event-content">
        <h3
          className="event-title bold"
          dangerouslySetInnerHTML={{ __html: formattedTitle }}
        />
        <p
          className="event-description"
          dangerouslySetInnerHTML={{ __html: formattedDescription }}
        />
        {additionalDate && (
          <p className="event-additional-date">{additionalDate}</p>
        )}
      </div>
      <img src={image} alt={title} className="event-image" />
    </div>
  );
};

const EventSection = ({ sectionTitle, events }) => {
  return (
    <div className="event-section">
      <h2 className="section-title bold">{sectionTitle}</h2>
      <div className="event-list">
        {events.map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            description={event.description}
            image={event.image}
            bgColor={event.bgColor}
            additionalDate={event.additionalDate}
          />
        ))}
      </div>
    </div>
  );
};

export default EventSection;
