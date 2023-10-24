type Props = {
  text: string;
};

const title = ({ text }: Props) => {
  return (
    <div className="text-center">
      <h1 className="mb-6 text-3xl font-bold text-purple-600">{text}</h1>
    </div>
  );
};

export default title;
