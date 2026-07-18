const JOBS = [
  {
    role: 'Software Engineer',
    org: 'National Incubation Center (NIC Pakistan)',
    date: 'Sep 2022 – Jan 2024',
    points: [
      'Built and managed full-stack promotional workflows, integrating third-party APIs with custom backend logic to automate multi-channel marketing campaigns.',
      'Containerized internal data pipelines and audience-tracking applications using Docker, ensuring consistent environments across development and staging.',
      'Analyzed user behavioral metrics and API data patterns to optimize internal targeting tools, directly improving digital engagement.',
    ],
    stack: 'full-stack · docker · rest apis · data pipelines',
  },
  {
    role: 'Frontend Developer',
    org: 'Interns Pakistan',
    date: 'Aug 2022 – Oct 2022',
    points: [
      'Developed and deployed responsive web interfaces using HTML5, CSS3, and JavaScript, translating design mockups into pixel-perfect pages.',
      'Optimized client-side rendering and cross-browser compatibility, testing across multiple devices for a seamless user experience.',
    ],
    stack: 'html5 · css3 · javascript · wordpress',
  },
  {
    role: 'Digital Marketing Intern',
    org: 'South Asia Impex',
    date: 'Jul 2022 – Sep 2022',
    points: [
      'Led data-driven SEO and social media campaigns for cross-industry clients, improving search visibility and audience engagement.',
      'Managed end-to-end project lifecycles with cross-functional teams, delivering 100% of projects on time and within budget.',
    ],
    stack: 'seo · analytics · campaign management',
  },
];

export default function Experience() {
  return (
    <section id="experience">
      <div className="sec reveal"><span className="path">~/experience</span><h2>Experience</h2></div>
      <div className="xp">
        {JOBS.map((j) => (
          <div className="xp-item reveal" key={j.org}>
            <div className="xp-head">
              <div>
                <h3 className="xp-role">{j.role}</h3>
                <div className="xp-org">{j.org}</div>
              </div>
              <span className="xp-date">{j.date}</span>
            </div>
            <ul>
              {j.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
            <div className="xp-tags">stack: <b>{j.stack}</b></div>
          </div>
        ))}
      </div>
    </section>
  );
}
