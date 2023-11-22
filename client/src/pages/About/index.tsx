import Layout from '../../components/Layout';
import Title from '../../components/Title';

const About = () => {
  return (
    <Layout>
      <div className="grid justify-center">
        <Title text="About" />
        <div className="my-5 w-[65ch]">
          <h2 className="mb-4 text-2xl font-bold text-accent-600">
            This project:
          </h2>
          <p>
            A monorepo featuring an Express backend and a single-page React
            application powered by Vite, all in TypeScript - with the main focus
            on learning, e.g. web scraping with cheerio.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
