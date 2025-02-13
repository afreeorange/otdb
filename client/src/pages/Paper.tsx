import Helmet from "react-helmet";
import { PiEyeglassesDuotone } from "react-icons/pi";

import { SITE_NAME } from "../constants";
import Shell from "../components/Shell";

export default () => (
	<>
		<Helmet>
			<title>Paper &ndash; {SITE_NAME}</title>
		</Helmet>

		<Shell>
			<h1 className="mb-2 text-3xl font-bold">
				Exon-level Expression Profiling of Ocular Tissues
			</h1>

			<h2 className="mb-2 text-xl">
				Alex H Wagner, V Nikhil Anand, Wan-Heng Wang, Jon E Chatterton, Duo Sun,
				Allan R Shepard, Nasreen Jacobson, Iok-Hou Pang, Adam P Deluca, Thomas L
				Casavant, Todd E Scheetz, Robert F Mullins, Terry A Braun, Abbot F Clark
			</h2>

			<p className="mb-8 text-sm">
				<span>
					<em>Exp Eye Res</em>. 2013 June ; 0: 105 &ndash; 111.
				</span>{" "}
				<a href="https://pubmed.ncbi.nlm.nih.gov/23500522/">
					doi:10.1016/j.exer.2013.03.004
				</a>
			</p>

			<h3 className="mb-2 text-xl font-bold uppercase">Abstract</h3>

			<p>
				The normal gene expression profiles of the tissues in the eye are a
				valuable resource for considering genes likely to be involved with
				disease processes. We profiled gene expression in ten ocular tissues
				from human donor eyes using Affymetrix Human Exon 1.0 ST arrays. Ten
				different tissues were obtained from six different individuals and RNA
				was pooled. The tissues included: retina, optic nerve head (ONH), optic
				nerve (ON), ciliary body (CB), trabecular meshwork (TM), sclera, lens,
				cornea, choroid/retinal pigment epithelium (RPE) and iris. Expression
				values were compared with publically available Expressed Sequence Tag
				(EST) and RNA-sequencing resources. Known tissue-specific genes were
				examined and they demonstrated correspondence of expression with the
				representative ocular tissues. The estimated gene and exon level
				abundances are available online at the Ocular Tissue Database.
			</p>

			{/*  */}
			<a
				className="group btn btn-outline btn-block btn-lg my-8 flex "
				href={"/paper.pdf"}
			>
				<PiEyeglassesDuotone className="mr-2" /> Read the Paper
			</a>
		</Shell>
	</>
);
