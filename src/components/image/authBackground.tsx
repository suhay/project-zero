import Image from "next/image";

const AuthBackground = () => {
  return (
    <Image
      src="/assets/authbg.jpg"
      alt="authbackground"
      width={700}
      height={700}
      className="absolute my-auto m-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-sm"
    />
  );
};

export default AuthBackground;
