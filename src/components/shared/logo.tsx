import Image from "next/image";
export const Logo = () => {
  return (
    <Image
      src="/project-complexity-analyzet-logo.png"
      width={100}
      priority
      height={100}
      alt={"Logo"}
    />
  );
};
