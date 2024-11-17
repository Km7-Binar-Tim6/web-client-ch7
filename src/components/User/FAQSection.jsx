import FAQAccordion from "./FAQAccordion";

const FAQSection = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-start">
          {/* Text Section */}
          <div className="col-md-6 mb-4 mb-md-0">
            <h2 className="h3 fw-bold">Frequently Asked Question</h2>
            <p className="text-muted">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="col-md-6">
            <FAQAccordion />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
