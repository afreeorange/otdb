import { Component, createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { FiArrowRight } from "solid-icons/fi";

import { NAVIGATION } from "../constants";
import { Dataset, SearchType } from "../types";

const TheOTDB = () => (
  <h1 class="place-self-center">
    <A href="/" class="text-primary hover:text-primary-focus">
      The <span class="font-bold">OTDB</span>
    </A>
  </h1>
);

const Nav = () => (
  <div class="place-self-center">
    <ul class="flex space-x-8">
      {NAVIGATION.map((_) => (
        <li>
          <A
            href={_.uri}
            class="flex text-primary opacity-50 transition-colors hover:opacity-100"
            activeClass="!opacity-100 font-bold"
          >
            {/* TODO: React.cloneElement but for SolidJS? */}
            <span class="[&>*]:mr-1 [&>*]:h-5">{_.icon}</span>
            <span>{_.text}</span>
          </A>
        </li>
      ))}
    </ul>
  </div>
);

const Header: Component = () => {
  const [dataset, setDataset] = createSignal<Dataset>("CORE");
  const [searchType, setSearchType] = createSignal<SearchType>("gene");
  const [search, setSearch] = createSignal<boolean>(false);

  return (
    <div class="border-b px-2 py-1">
      <div class="flex">
        <TheOTDB />

        {/* Search Options */}
        <div
          class="absolute left-10 top-10 z-10 w-[18.75rem] rounded-lg border bg-base-100 px-2 pb-2 pt-1 text-sm shadow-2xl"
          classList={{
            hidden: !search(),
          }}
        >
          <p class="my-1 ml-1 text-neutral-400">search by</p>
          <div class="btn-group btn-group-vertical flex [&>*]:border-neutral-200 [&>*]:text-left [&>*]:font-normal [&>*]:normal-case">
            <button
              class="btn btn-outline btn-sm"
              classList={{
                "btn-active !font-bold": searchType() === "gene",
              }}
              onclick={() => setSearchType("gene")}
            >
              <span class="w-full">Gene Symbol or Description</span>
            </button>
            <button
              class="btn btn-outline btn-sm border-y-0"
              classList={{
                "btn-active !font-bold": searchType() === "mrna",
              }}
              onclick={() => setSearchType("mrna")}
            >
              <span class="w-full">mRNA Accession or Description</span>
            </button>
            <button
              class="btn btn-outline btn-sm"
              classList={{
                "btn-active !font-bold": searchType() === "transcript_id",
              }}
              onclick={() => setSearchType("transcript_id")}
            >
              <span class="w-full">Transcript ID</span>
            </button>
          </div>
          <p class="mb-1 ml-1 mt-4 text-neutral-400">from the</p>
          <div class="btn-group flex [&>*]:border-neutral-200 [&>*]:font-normal [&>*]:capitalize">
            <button
              class="btn btn-outline btn-xs flex-1 border-r-0"
              classList={{
                "btn-active !font-bold": dataset() === "CORE",
              }}
              onclick={() => setDataset("CORE")}
            >
              Core Dataset
            </button>
            <button
              class="btn btn-outline btn-xs flex-1 border-l-0"
              classList={{
                "btn-active": dataset() === "EXTENDED",
              }}
              onclick={() => setDataset("EXTENDED")}
            >
              Extended Dataset
            </button>
          </div>
        </div>

        {/* Search Box */}
        <div class="join flex-1 place-self-center">
          <input
            type="text"
            placeholder="search..."
            class="input join-item input-bordered input-sm ml-2 w-56 border-primary"
            onfocus={() => setSearch(true)}
          />

          <button class=" btn btn-outline join-item btn-sm text-primary hover:border-primary hover:bg-primary">
            <div>Go</div> <FiArrowRight />
          </button>
        </div>

        <Nav />
      </div>
    </div>
  );
};

export default Header;
