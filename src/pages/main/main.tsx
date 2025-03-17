import { Form } from "@components/Form";
import { Todos } from "@components/Todos";

const Main = () => {
  return (
    <>
      <main className="flex justify-center m-10">
        <Form useRedux={false} />
      </main>
      <section className="w-[50%] mx-auto">
        <Todos useRedux={false} />
      </section>
    </>
  );
};

export default Main;
