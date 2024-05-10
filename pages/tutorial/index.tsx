import React, { use, useEffect } from "react";
import $ from "./Tutorial.module.scss";
import Image from "next/image";
import { User } from "@/src/components/User/User";
import { Icon } from "@/src/components/Icon/Icon";
import { useRouter } from "next/router";

const Tutorial = () => {
  const router = useRouter();
  const bg = "/images/test.svg";

  const handleCameraClick = () => {
    router.push("/tutorial/camera");
  };

  return (
    <section className={$.container}>
      <div className={$.bgContainer}>
        <Image src={bg} alt="background" layout="fill" className={$.bg} />
      </div>
      <div className={$.userContainer}>
        <User />
      </div>
      <div className={$.sittingsContainer}>
        <Icon icon="settings" />
      </div>

      <ul className={$.iconsList}>
        <li className={$.icon}>
          <button className={$.iconButton} onClick={handleCameraClick}>
            <Icon icon="camera" text="Mijn kamer" />
          </button>
        </li>
        <li className={$.icon}>
          <button className={$.iconButton}>
            <Icon icon="camera" text="Slaapkamer" />
          </button>
        </li>
        <li className={$.icon}>
          <button className={$.iconButton}>
            <Icon icon="camera" text="Woonkamer" />
          </button>
        </li>
      </ul>
    </section>
  );
};

export default Tutorial;
