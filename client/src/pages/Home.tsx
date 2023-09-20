import { Component } from "solid-js";
import { A } from "@solidjs/router";
import { Title } from "@solidjs/meta";
import { FiArrowRight } from 'solid-icons/fi'

// @ts-ignore
import { Motion } from "@motionone/solid";

import BaseFooter from "../components/Footer";
import { NAVIGATION, SITE_NAME } from "../constants";

const Card: Component<{
  text: string;
  uri: string;
  icon: any; // TODO: Lol...
}> = ({ text, uri, icon }) => (
  <A
    href={`${uri}`}
    class="group card min-w-[8em] cursor-pointer border p-3 pb-2 transition-all hover:border-solid hover:border-primary hover:bg-primary  [&>*]:hover:text-primary"
  >
    <div class="mb-2 [&>*]:h-8 [&>*]:w-8">{icon}</div>
    <span class="group-hover:text-base-100">{text}</span>
  </A>
);

const Home = () => (
  <Motion.div
    animate={{ opacity: [0, 1] }}
    transition={{ duration: 0.25, easing: "ease-in-out" }}
  >
    <div class="bg-home flex min-h-screen">
      <Title>{SITE_NAME}</Title>

      <div class="hero self-center border-b-red-800 border-t-red-800 bg-base-100 shadow-2xl">
        <div class="hero-content p-8">
          <div>
            <h1 class="mb-5  text-primary">
              <span class="text-3xl">The</span>{" "}
              <span class="block text-5xl font-bold uppercase">
                Ocular Tissue Database
              </span>
            </h1>

            <div class="join mb-2">
              <input
                class="input join-item input-bordered w-[500px] border-primary text-xl text-black focus:border-primary"
                placeholder='e.g. "MAK"   "2941632"   "synthase"'
              />
              <button class="btn btn-outline join-item border-primary text-xl text-primary transition-all hover:border-primary hover:bg-primary">
                <div class="mt-1.5">Go</div> <FiArrowRight />
              </button>
            </div>

            <div class="mt-2 flex place-items-center gap-3">
              <div class="w-20 text-neutral-400">search by</div>
              <div>
                <select class="select select-bordered select-sm w-full max-w-xs focus:border-primary">
                  <option selected>Gene Symbol or Description</option>
                  <option>mRNA Accession or Description</option>
                  <option>Transcript ID</option>
                </select>
              </div>
            </div>

            <div class="mt-2 flex place-items-center gap-3">
              <div class="w-20 text-neutral-400">from the</div>
              <div>
                <select class="select select-bordered select-sm w-full max-w-xs focus:border-primary">
                  <option selected>Core Dataset</option>
                  <option>Extended Dataset</option>
                </select>
              </div>
            </div>

            <div class="my-6 grid grid-cols-4 gap-4 border-y py-6">
              {NAVIGATION.map((_) => (
                <Card text={_.text} uri={_.uri} icon={_.icon} />
              ))}
            </div>

            <BaseFooter />
          </div>
        </div>
      </div>
    </div>
  </Motion.div>
);

export default Home;
