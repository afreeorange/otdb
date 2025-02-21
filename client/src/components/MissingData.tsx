const Component = ({ message }: { message: string }) => (
  <div className="flex justify-center align-middle h-full">
    <h1 className="bg-white self-center rounded-md px-2">{message}</h1>
  </div>
);

export default Component;
