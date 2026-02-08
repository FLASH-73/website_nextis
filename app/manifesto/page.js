"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import LanguageToggle from "@/components/LanguageToggle";

const manifestoEN = [
    { type: "title", text: "The Universal Constructor" },
    {
        type: "paragraph",
        text: `In 1977, Ken Olsen, president of Digital Equipment Corporation, one of the most successful computer companies in the world, said: "There is no reason anyone would want a computer in their home."`,
    },
    {
        type: "paragraph",
        text: "He wasn't stupid. He was looking at the world as it was. And in the world as it was, he was right. Nobody needed a spreadsheet. Nobody was asking for email. There was no World Wide Web, no app, no reason.",
    },
    {
        type: "paragraph",
        text: "Steve Jobs saw the world as it would be. He understood something Olsen didn't: you don't build the future by asking people what they need. You build the tool, and the need reveals itself. The personal computer didn't fill a gap in the market. It created a market that didn't exist.",
    },
    {
        type: "paragraph",
        text: "We are at that exact moment again.",
    },
    { type: "divider" },
    {
        type: "paragraph",
        text: "In 1948, John von Neumann proved something remarkable. Just as Alan Turing had shown that a single machine could perform any computation, von Neumann showed that a single machine could build any physical object, given the right instructions.",
    },
    {
        type: "paragraph",
        text: "Turing gave us the universal computer. Von Neumann described the universal constructor.",
    },
    {
        type: "paragraph",
        text: "We built the first one. We never built the second.",
    },
    { type: "emphasis", text: "Until now." },
    { type: "divider" },
    {
        type: "paragraph",
        text: "Today, if you have an idea, you can write about it. You can film it. You can code it. The digital tools are everywhere. A teenager with a laptop has more creative publishing power than a 1980s television network.",
    },
    {
        type: "paragraph",
        text: "But if your idea is physical, if you want to build something you can hold, you are stuck. You need a factory. You need suppliers. You need capital, contracts, minimum order quantities, months of lead time. The physical world is still locked behind industrial gatekeepers.",
    },
    {
        type: "paragraph",
        text: "That is about to end.",
    },
    { type: "divider" },
    {
        type: "paragraph",
        text: `People ask us: "Who needs a robot assembler at home?"`,
    },
    {
        type: "paragraph",
        text: "It's the wrong question. It's Ken Olsen's question.",
    },
    {
        type: "emphasis",
        text: "The right question is: what happens when anyone can build anything?",
    },
    {
        type: "paragraph",
        text: "What happens when a designer in Lagos can assemble custom electronics in her living room? When a retired engineer in Hamburg can prototype and produce his inventions without ever contacting a factory? When a kid builds a robot for a school project. Not from a kit someone else designed, but from her own imagination, assembled overnight by a machine that understands what she drew?",
    },
    {
        type: "paragraph",
        text: "You cannot predict these applications. That's the point. That is what universal means.",
    },
    { type: "divider" },
    {
        type: "paragraph",
        text: "There's a popular story about the future: AI will automate everything. Most jobs will disappear. Governments will send checks. People will... consume.",
    },
    {
        type: "emphasis",
        text: "We reject this story.",
    },
    {
        type: "paragraph",
        text: "Not because AI won't change everything. It will. But because the story misunderstands people. Humans are not consumers. Humans are builders. We have spent 300,000 years making things with our hands. The urge to create is not a phase of economic history. It is who we are.",
    },
    {
        type: "paragraph",
        text: "The real story of abundance is not a world where people have nothing to do. It is a world where people are finally free to do what they've always wanted: create.",
    },
    {
        type: "paragraph",
        text: "Look around. The signs are already here. Millions of people are choosing to write, film, design, compose, not because someone told them to, but because they want to. Influencers, YouTubers, indie game developers, Substack writers, open-source contributors. The creative economy isn't a niche. It's the leading edge of a species remembering what it's for.",
    },
    {
        type: "paragraph",
        text: "But right now, all of that creation is trapped behind a screen.",
    },
    {
        type: "emphasis",
        text: "We are going to break it out.",
    },
    { type: "divider" },
    {
        type: "paragraph",
        text: "The personal computer fulfilled Turing's proof. It put universal computation on every desk, in every pocket.",
    },
    {
        type: "paragraph",
        text: "The universal constructor will fulfill von Neumann's proof. It will put universal fabrication in every home, every workshop, every garage.",
    },
    {
        type: "paragraph",
        text: "This is not analogy. This is the same revolution, continued. The second half of a story that started in the 1940s.",
    },
    {
        type: "paragraph",
        text: "Turing and von Neumann saw both halves. We have only built the first.",
    },
    { type: "divider" },
    {
        type: "paragraph",
        text: "They will say the machine is too expensive. Computers once cost $50,000. They will say it's too complex. Computers once required trained operators. They will say no one needs it. They said that about the PC. About the internet. About the smartphone.",
    },
    {
        type: "paragraph",
        text: "They are wrong, for the same reason they were always wrong: they are imagining today's needs, not tomorrow's possibilities.",
    },
    { type: "divider" },
    {
        type: "paragraph",
        text: "We are building the universal constructor.",
    },
    {
        type: "paragraph",
        text: "Not a toy. Not a demo. Not a research project.",
    },
    {
        type: "paragraph",
        text: "A machine that assembles. That builds. That takes instructions from an intelligence, human or artificial, and makes them real.",
    },
    {
        type: "paragraph",
        text: "We start with industrial assembly, because that's where the pain is sharpest and the path to revenue is clear. But we know exactly where we're going.",
    },
    {
        type: "emphasis",
        text: "Every factory. Every workshop. Every home.",
    },
    {
        type: "paragraph",
        text: "Von Neumann showed it was possible. Turing's half has been built. Now we build the other half.",
    },
    {
        type: "paragraph",
        text: "The universal constructor is coming. And it will change what it means to be human. Not by replacing what we do, but by unleashing what we've always been.",
    },
    { type: "emphasis", text: "Builders." },
    { type: "divider" },
    { type: "signature", text: "Nextis" },
];

const manifestoDE = [
    { type: "title", text: "Der Universelle Konstruktor" },
    {
        type: "paragraph",
        text: `1977 sagte Ken Olsen, Präsident der Digital Equipment Corporation, eines der erfolgreichsten Computerunternehmen der Welt: „Es gibt keinen Grund, warum irgendjemand einen Computer zu Hause haben wollen würde."`,
    },
    {
        type: "paragraph",
        text: "Er war nicht dumm. Er betrachtete die Welt, wie sie war. Und in der Welt, wie sie war, hatte er recht. Niemand brauchte eine Tabellenkalkulation. Niemand verlangte nach E-Mail. Es gab kein World Wide Web, keine App, keinen Grund.",
    },
    {
        type: "paragraph",
        text: "Steve Jobs sah die Welt, wie sie sein würde. Er verstand etwas, das Olsen nicht verstand: Man baut die Zukunft nicht, indem man Menschen fragt, was sie brauchen. Man baut das Werkzeug, und der Bedarf offenbart sich von selbst. Der Personal Computer füllte keine Marktlücke. Er erschuf einen Markt, den es nicht gab.",
    },
    {
        type: "paragraph",
        text: "Wir stehen genau an diesem Punkt. Wieder.",
    },
    { type: "divider" },
    {
        type: "paragraph",
        text: "1948 bewies John von Neumann etwas Bemerkenswertes. So wie Alan Turing gezeigt hatte, dass eine einzige Maschine jede Berechnung ausführen kann, zeigte von Neumann, dass eine einzige Maschine jedes physische Objekt bauen kann. Vorausgesetzt, sie erhält die richtigen Anweisungen.",
    },
    {
        type: "paragraph",
        text: "Turing gab uns den universellen Computer. Von Neumann beschrieb den universellen Konstruktor.",
    },
    {
        type: "paragraph",
        text: "Den ersten haben wir gebaut. Den zweiten nie.",
    },
    { type: "emphasis", text: "Bis jetzt." },
    { type: "divider" },
    {
        type: "paragraph",
        text: "Heute, wenn du eine Idee hast, kannst du darüber schreiben. Du kannst sie filmen. Du kannst sie programmieren. Die digitalen Werkzeuge sind überall. Ein Teenager mit einem Laptop hat mehr kreative Reichweite als ein Fernsehsender in den Achtzigern.",
    },
    {
        type: "paragraph",
        text: "Aber wenn deine Idee physisch ist, wenn du etwas bauen willst, das du in den Händen halten kannst, steckst du fest. Du brauchst eine Fabrik. Du brauchst Zulieferer. Du brauchst Kapital, Verträge, Mindestbestellmengen, Monate an Vorlaufzeit. Die physische Welt ist immer noch hinter industriellen Torwächtern verschlossen.",
    },
    {
        type: "paragraph",
        text: "Damit ist bald Schluss.",
    },
    { type: "divider" },
    {
        type: "paragraph",
        text: `Man fragt uns: „Wer braucht einen Roboter-Assembler zu Hause?"`,
    },
    {
        type: "paragraph",
        text: "Es ist die falsche Frage. Es ist Ken Olsens Frage.",
    },
    {
        type: "emphasis",
        text: "Die richtige Frage lautet: Was passiert, wenn jeder alles bauen kann?",
    },
    {
        type: "paragraph",
        text: "Was passiert, wenn eine Designerin in Lagos in ihrem Wohnzimmer eigene Elektronik montiert? Wenn ein pensionierter Ingenieur in Hamburg seine Erfindungen prototypisiert und fertigt, ohne je eine Fabrik kontaktieren zu müssen? Wenn ein Kind einen Roboter für ein Schulprojekt baut. Nicht aus einem Bausatz, den jemand anderes entworfen hat, sondern aus der eigenen Vorstellung, über Nacht zusammengesetzt von einer Maschine, die versteht, was es gezeichnet hat?",
    },
    {
        type: "paragraph",
        text: "Man kann diese Anwendungen nicht vorhersagen. Das ist der Punkt. Das ist es, was universell bedeutet.",
    },
    { type: "divider" },
    {
        type: "paragraph",
        text: "Es gibt eine beliebte Erzählung über die Zukunft: KI wird alles automatisieren. Die meisten Arbeitsplätze verschwinden. Regierungen überweisen Schecks. Und die Menschen... konsumieren.",
    },
    {
        type: "emphasis",
        text: "Wir lehnen diese Erzählung ab.",
    },
    {
        type: "paragraph",
        text: "Nicht weil KI nicht alles verändern wird. Das wird sie. Sondern weil diese Geschichte den Menschen missversteht. Menschen sind keine Konsumenten. Menschen sind Erbauer. Seit 300.000 Jahren erschaffen wir Dinge mit unseren Händen. Der Drang zu gestalten ist keine Phase der Wirtschaftsgeschichte. Er ist, wer wir sind.",
    },
    {
        type: "paragraph",
        text: "Die wahre Geschichte des Überflusses handelt nicht von einer Welt, in der Menschen nichts zu tun haben. Sie handelt von einer Welt, in der Menschen endlich frei sind zu tun, was sie immer wollten: erschaffen.",
    },
    {
        type: "paragraph",
        text: "Schau dich um. Die Zeichen sind bereits da. Millionen von Menschen entscheiden sich zu schreiben, zu filmen, zu gestalten, zu komponieren, nicht weil jemand es ihnen aufgetragen hat, sondern weil sie es wollen. Influencer, YouTuber, Indie-Spieleentwickler, Substack-Autoren, Open-Source-Beitragende. Die kreative Ökonomie ist keine Nische. Sie ist die Vorhut einer Spezies, die sich daran erinnert, wofür sie da ist.",
    },
    {
        type: "paragraph",
        text: "Aber im Moment ist all dieses Schaffen hinter einem Bildschirm gefangen.",
    },
    {
        type: "emphasis",
        text: "Wir werden es befreien.",
    },
    { type: "divider" },
    {
        type: "paragraph",
        text: "Der Personal Computer erfüllte Turings Beweis. Er brachte universelle Berechnung auf jeden Schreibtisch, in jede Tasche.",
    },
    {
        type: "paragraph",
        text: "Der universelle Konstruktor wird von Neumanns Beweis erfüllen. Er wird universelle Fertigung in jedes Zuhause bringen, jede Werkstatt, jede Garage.",
    },
    {
        type: "paragraph",
        text: "Das ist keine Analogie. Das ist dieselbe Revolution, fortgesetzt. Die zweite Hälfte einer Geschichte, die in den 1940ern begann.",
    },
    {
        type: "paragraph",
        text: "Turing und von Neumann sahen beide Hälften. Wir haben nur die erste gebaut.",
    },
    { type: "divider" },
    {
        type: "paragraph",
        text: "Sie werden sagen, die Maschine sei zu teuer. Computer kosteten einst 50.000 Dollar. Sie werden sagen, sie sei zu komplex. Computer erforderten einst geschulte Bediener. Sie werden sagen, niemand brauche sie. Das sagten sie über den PC. Über das Internet. Über das Smartphone.",
    },
    {
        type: "paragraph",
        text: "Sie irren sich. Aus demselben Grund, aus dem sie sich immer geirrt haben: Sie stellen sich die Bedürfnisse von heute vor, nicht die Möglichkeiten von morgen.",
    },
    { type: "divider" },
    {
        type: "paragraph",
        text: "Wir bauen den universellen Konstruktor.",
    },
    {
        type: "paragraph",
        text: "Kein Spielzeug. Keine Demo. Kein Forschungsprojekt.",
    },
    {
        type: "paragraph",
        text: "Eine Maschine, die montiert. Die baut. Die Anweisungen einer Intelligenz entgegennimmt, ob menschlich oder künstlich, und sie Wirklichkeit werden lässt.",
    },
    {
        type: "paragraph",
        text: "Wir beginnen mit industrieller Montage, weil dort der Schmerz am größten und der Weg zum Umsatz am klarsten ist. Aber wir wissen genau, wohin wir gehen.",
    },
    {
        type: "emphasis",
        text: "Jede Fabrik. Jede Werkstatt. Jedes Zuhause.",
    },
    {
        type: "paragraph",
        text: "Von Neumann hat gezeigt, dass es möglich ist. Turings Hälfte ist gebaut. Jetzt bauen wir die andere.",
    },
    {
        type: "paragraph",
        text: "Der universelle Konstruktor kommt. Und er wird verändern, was es bedeutet, Mensch zu sein. Nicht indem er ersetzt, was wir tun. Sondern indem er entfesselt, was wir immer waren.",
    },
    { type: "emphasis", text: "Erbauer." },
    { type: "divider" },
    { type: "signature", text: "Nextis" },
];

function renderBlock(block, index) {
    switch (block.type) {
        case "title":
            return (
                <h1
                    key={index}
                    className="font-light tracking-tight text-gray-900 mb-16"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                >
                    {block.text}
                </h1>
            );
        case "paragraph":
            return (
                <p
                    key={index}
                    className="text-gray-700 leading-relaxed mb-6 font-light"
                    style={{ fontSize: "clamp(1.05rem, 1.2vw, 1.25rem)" }}
                >
                    {block.text}
                </p>
            );
        case "emphasis":
            return (
                <p
                    key={index}
                    className="text-gray-900 leading-relaxed mb-6 font-medium"
                    style={{ fontSize: "clamp(1.05rem, 1.2vw, 1.25rem)" }}
                >
                    {block.text}
                </p>
            );
        case "divider":
            return (
                <div key={index} className="my-12 flex justify-center">
                    <span className="block w-8 h-px bg-gray-300" />
                </div>
            );
        case "signature":
            return (
                <p
                    key={index}
                    className="text-gray-400 italic text-lg mt-8"
                >
                    {block.text}
                </p>
            );
        default:
            return null;
    }
}

export default function ManifestoPage() {
    const { language } = useLanguage();
    const blocks = language === "de" ? manifestoDE : manifestoEN;
    const backText = language === "de" ? "\u2190 Zur\u00fcck" : "\u2190 Back";

    return (
        <main className="min-h-screen bg-white">
            <LanguageToggle />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl mx-auto px-6 py-24"
            >
                <Link
                    href="/"
                    className="text-sm text-gray-400 hover:text-gray-600 transition-colors duration-300 mb-16 inline-block"
                >
                    {backText}
                </Link>

                <article>
                    {blocks.map((block, i) => renderBlock(block, i))}
                </article>
            </motion.div>
        </main>
    );
}
