import CreateShortURLForm from "../features/url/components/CreateShortURLForm";

function Home() {
  return (
    <main>
      <section className="w-full h-screen grid place-items-center bg-zinc-100">
        <CreateShortURLForm />
      </section>
    </main>
  );
}

export default Home;
