const PEOPLE_URL = "people.json";

const fallbackPeopleData = [
  { name: "Maria Iasneva-Golubeva", birthYear: 1861, deathYear: 1936, photoPath: "", placeOfBirth: "", howDied: "", fate: "pre", note: "Joined after the 1903 congress; died before the height of the Great Purge." },
  { name: "Anna Ulyanova", birthYear: 1864, deathYear: 1935, photoPath: "", placeOfBirth: "", howDied: "", fate: "pre", note: "Lenin's sister; party member since 1898." },
  { name: "Peteris Stucka", birthYear: 1865, deathYear: 1932, photoPath: "", placeOfBirth: "", howDied: "", fate: "pre", note: "Latvian Bolshevik and legal theorist; supported the Bolsheviks in 1903." },
  { name: "Pauls Dauge", birthYear: 1869, deathYear: 1946, photoPath: "", placeOfBirth: "", howDied: "", fate: "survived", note: "Arrested during the Great Purge, but survived." },
  { name: "Nadezhda Krupskaya", birthYear: 1869, deathYear: 1939, photoPath: "", placeOfBirth: "", howDied: "", fate: "survived", note: "Lenin's partner and a major party educator; died of illness." },
  { name: "Vladimir Lenin", birthYear: 1870, deathYear: 1924, photoPath: "", placeOfBirth: "", howDied: "Illness after a series of strokes.", fate: "pre", note: "Founder and leader of the Bolsheviks." },
  { name: "Leonid Krasin", birthYear: 1870, deathYear: 1926, photoPath: "", placeOfBirth: "", howDied: "", fate: "pre", note: "Engineer, financier, and early Bolshevik organizer." },
  { name: "Alexander Tsiurupa", birthYear: 1870, deathYear: 1928, photoPath: "", placeOfBirth: "", howDied: "", fate: "pre", note: "Old Bolshevik and Soviet food commissar." },
  { name: "Semyon Sereda", birthYear: 1871, deathYear: 1933, photoPath: "", placeOfBirth: "", howDied: "", fate: "pre", note: "Joined the Bolsheviks in 1903." },
  { name: "Gleb Krzhizhanovsky", birthYear: 1872, deathYear: 1959, photoPath: "", placeOfBirth: "", howDied: "", fate: "survived", note: "Old underground comrade of Lenin and GOELRO planner." },
  { name: "Cecilia Bobrovskaya", birthYear: 1873, deathYear: 1960, photoPath: "", placeOfBirth: "", howDied: "", fate: "survived", note: "Old Bolshevik organizer and memoirist." },
  { name: "Vladimir Bonch-Bruyevich", birthYear: 1873, deathYear: 1955, photoPath: "", placeOfBirth: "", howDied: "", fate: "survived", note: "Administrator, writer, and early Bolshevik fixer." },
  { name: "Elena Stasova", birthYear: 1873, deathYear: 1966, photoPath: "", placeOfBirth: "", howDied: "", fate: "survived", note: "One of the longest-lived Old Bolsheviks in this selection." },
  { name: "Sergey Gusev", birthYear: 1874, deathYear: 1933, photoPath: "", placeOfBirth: "", howDied: "", fate: "pre", note: "Founding member of the Bolshevik faction in 1903." },
  { name: "Dmitry Ilyich Ulyanov", birthYear: 1874, deathYear: 1943, photoPath: "", placeOfBirth: "", howDied: "", fate: "survived", note: "Lenin's brother and an old underground activist." },
  { name: "Mikhail Kalinin", birthYear: 1875, deathYear: 1946, photoPath: "", placeOfBirth: "", howDied: "", fate: "survived", note: "Long-serving Soviet head of state in formal terms." },
  { name: "Maxim Litvinov", birthYear: 1876, deathYear: 1951, photoPath: "", placeOfBirth: "", howDied: "", fate: "survived", note: "Diplomat and foreign commissar; survived Stalin's terror years." },
  { name: "Rosalia Zemlyachka", birthYear: 1876, deathYear: 1947, photoPath: "", placeOfBirth: "", howDied: "", fate: "survived", note: "Prominent revolutionary and Soviet official." },
  { name: "Joseph Stalin", birthYear: 1878, deathYear: 1953, photoPath: "", placeOfBirth: "", howDied: "Stroke.", fate: "survived", note: "Old Bolshevik and Soviet leader from the late 1920s until 1953." },
  { name: "Grigory Petrovsky", birthYear: 1878, deathYear: 1958, photoPath: "", placeOfBirth: "", howDied: "", fate: "survived", note: "Old Bolshevik who outlived the purge years." },
  { name: "Vladimir Adoratsky", birthYear: 1878, deathYear: 1945, photoPath: "", placeOfBirth: "", howDied: "", fate: "survived", note: "Party intellectual and editor; survived the purges." },
  { name: "Serafima Hopner", birthYear: 1880, deathYear: 1966, photoPath: "", placeOfBirth: "", howDied: "", fate: "survived", note: "Old Bolshevik who remained alive deep into the post-Stalin era." },
  { name: "Mikhail Tomsky", birthYear: 1880, deathYear: 1936, photoPath: "", placeOfBirth: "", howDied: "Suicide.", fate: "purged", note: "Committed suicide before his show trial amid the purges." },
  { name: "Nikolai Podvoisky", birthYear: 1880, deathYear: 1948, photoPath: "", placeOfBirth: "", howDied: "", fate: "survived", note: "Revolutionary organizer and military figure." },
  { name: "Lydia Fotiyeva", birthYear: 1881, deathYear: 1975, photoPath: "", placeOfBirth: "", howDied: "", fate: "survived", note: "The longest-lived figure in this selection." },
  { name: "Nadezhda Kolesnikova", birthYear: 1882, deathYear: 1964, photoPath: "", placeOfBirth: "", howDied: "", fate: "survived", note: "Old Bolshevik active since 1904." },
  { name: "Lev Kamenev", birthYear: 1883, deathYear: 1936, photoPath: "", placeOfBirth: "", howDied: "Executed.", fate: "purged", note: "Convicted at the Trial of the Sixteen and executed." },
  { name: "Grigory Zinoviev", birthYear: 1883, deathYear: 1936, photoPath: "", placeOfBirth: "", howDied: "Executed.", fate: "purged", note: "Executed in the first Moscow show trial." },
  { name: "Aleksei Badayev", birthYear: 1883, deathYear: 1951, photoPath: "", placeOfBirth: "", howDied: "", fate: "survived", note: "Worker deputy turned Soviet official." },
  { name: "Dmitry Manuilsky", birthYear: 1883, deathYear: 1959, photoPath: "", placeOfBirth: "", howDied: "", fate: "survived", note: "International communist functionary who survived the terror." },
  { name: "Andrei Bubnov", birthYear: 1883, deathYear: 1938, photoPath: "", placeOfBirth: "", howDied: "Executed.", fate: "purged", note: "Arrested and shot during the Great Purge." },
  { name: "Dora Lazurkina", birthYear: 1884, deathYear: 1974, photoPath: "", placeOfBirth: "", howDied: "", fate: "survived", note: "Spent 17 years in the Gulag and survived." },
  { name: "Mikhail Frunze", birthYear: 1885, deathYear: 1925, photoPath: "", placeOfBirth: "", howDied: "Complications after surgery.", fate: "pre", note: "Bolshevik commander who died well before the Great Purge." },
  { name: "Alexander Shliapnikov", birthYear: 1885, deathYear: 1937, photoPath: "", placeOfBirth: "", howDied: "Executed.", fate: "purged", note: "Executed after breaking with Stalin's line." },
  { name: "Nikolai Krylenko", birthYear: 1885, deathYear: 1938, photoPath: "", placeOfBirth: "", howDied: "Executed.", fate: "purged", note: "Old Bolshevik prosecutor and commissar, later executed." },
  { name: "Sergei Kirov", birthYear: 1886, deathYear: 1934, photoPath: "", placeOfBirth: "", howDied: "Assassinated.", fate: "pre", note: "His assassination became Stalin's pretext for mass terror." },
  { name: "Sergo Ordzhonikidze", birthYear: 1886, deathYear: 1937, photoPath: "", placeOfBirth: "", howDied: "Suicide.", fate: "purged", note: "Officially a suicide, widely read as tied to purge pressure." },
  { name: "Pavel Postyshev", birthYear: 1887, deathYear: 1939, photoPath: "", placeOfBirth: "", howDied: "Executed.", fate: "purged", note: "Party boss later executed in the purges." },
  { name: "Valerian Kuybyshev", birthYear: 1888, deathYear: 1935, photoPath: "", placeOfBirth: "", howDied: "", fate: "pre", note: "Senior Soviet planner who died before the main show trials." }
];

const EVENTS_URL = "events.json";

const builtInPileImagesData = {
  header: [
    "images/header-alexander-2.webp",
    "images/header-motherland-calls.webp",
    "images/header-rasputin.webp",
    "images/header-serfs-2.webp",
    "images/header-serfs.webp",
    "images/header-stalingrad-fountain.webp",
    "images/header-stalingrad.webp",
    "images/header-young-stalin.webp"
  ],
  footer: [
    "images/footer-earth.webp",
    "images/footer-luna-16.webp",
    "images/footer-space-stamp.webp",
    "images/footer-space-stamp-2.webp",
    "images/footer-space-stamp-3.webp",
    "images/footer-space-stamp-4.webp"
  ]
};

const fallbackEventsData = [
  {
    year: 1861.17,
    label: "Serfdom abolished",
    date: "March 3, 1861",
    details: "Tsar Alexander II abolished serfdom, a reform often presented as a progressive turning point. In practice, peasants still had to make redemption payments for land, and many allotments were too small or too poor to sustain families.\n\nThe reform loosened legal bondage without ending rural hardship. It mattered because it showed how reform in imperial Russia could coexist with continued elite control and deep peasant frustration.",
    width: 2.4,
    lane: 2,
    "x-offset": 0
  },
  {
    year: 1865.27,
    label: "American Civil War ends",
    date: "Apr 9, 1865",
    details: "Robert E. Lee surrendered to Ulysses S. Grant at Appomattox Court House, the act usually treated as the effective end of the American Civil War. The war destroyed slavery and preserved the Union, but it left the United States devastated and violently divided in its aftermath.",
    width: 2.8,
    lane: -3,
    "x-offset": 0
  },
  {
    year: 1874.0,
    label: "Narodnik movement rises",
    date: "1870s-1880s",
    details: "Revolutionary populists known as the Narodniks tried to mobilize the peasantry through the \"Going to the People\" campaigns. When that strategy failed, parts of the movement turned toward conspiratorial violence.\n\nThe key turning point came with the assassination of Tsar Alexander II by Narodnaya Volya in 1881. Instead of opening a path to change, it triggered a heavy crackdown and helped end what remained of the reformist momentum.",
    width: 2.2,
    lane: -1,
    "x-offset": 0
  },
  {
    year: 1877.31,
    label: "Russo-Turkish War begins",
    date: "Apr 24, 1877",
    details: "Russia declared war on the Ottoman Empire in 1877, presenting itself as the defender of Balkan Christians and Slavic nationalism. The war reshaped southeastern Europe and fed the nationalist tensions that would continue to destabilize the region for decades.",
    width: 2.7,
    lane: 4,
    "x-offset": 0
  },
  {
    year: 1881.2,
    label: "Alexander II assassinated",
    date: "March 13, 1881",
    details: "Tsar Alexander II was assassinated in St. Petersburg by members of Narodnaya Volya.\n\nThe killing did not open the way to broader reform. Instead, it helped bring the reform era to a close and was followed by a harsher authoritarian turn under Alexander III.",
    width: 2.2,
    lane: 1,
    "x-offset": 0
  },
  {
    year: 1881.25,
    label: "Alexander III reaction",
    date: "1881-1894",
    details: "Under Alexander III, the state turned sharply toward hardline autocracy. The Okhrana expanded, censorship tightened, and political dissent was repressed more aggressively.\n\nThe regime also pursued Russification, suppressing non-Russian languages and cultures across the empire. It marked a clear authoritarian rollback after the partial reforms of the 1860s.",
    width: 2.2,
    lane: 3,
    "x-offset": 0
  },
  {
    year: 1883.65,
    label: "Krakatoa erupts",
    date: "Aug 27, 1883",
    details: "The catastrophic eruption of Krakatoa produced one of the loudest sounds ever recorded and triggered tsunamis that killed tens of thousands. It became a global media event and a vivid reminder of how connected the late nineteenth-century world had become.",
    width: 2.3,
    lane: -1,
    "x-offset": 0
  },
  {
    year: 1884.87,
    label: "Berlin Conference opens",
    date: "Nov 15, 1884",
    details: "European powers met in Berlin to formalize the rules of colonial expansion in Africa without any African representation. The conference accelerated the partition of the continent and helped turn imperial rivalry into a more systematized scramble for territory.",
    width: 2.6,
    lane: 3,
    "x-offset": 0
  },
  {
    year: 1891.5,
    label: "Russian famine begins",
    date: "1891",
    details: "The famine of 1891-1892 exposed the weakness of the tsarist state as crop failure, disease, and official mismanagement spread across the empire. Relief work radicalized parts of the educated public and deepened the sense that the old regime was morally and politically bankrupt.",
    width: 2.8,
    lane: -4,
    "x-offset": 0
  },
  {
    year: 1893.72,
    label: "New Zealand women win the vote",
    date: "Sep 19, 1893",
    details: "New Zealand became the first self-governing country to grant women the right to vote in national elections. The reform quickly became an international point of reference for suffrage movements elsewhere.",
    width: 2.8,
    lane: 0,
    "x-offset": 0
  },
  {
    year: 1894.84,
    label: "Nicholas II takes throne",
    date: "Nov 1, 1894 (N.S.; Oct 20 O.S.)",
    details: "Nicholas II succeeded Alexander III and took the Russian throne as the empire's last tsar.\n\nHis accession briefly stirred hopes for a milder regime, but his reign would remain committed to autocracy and would end in abdication during the 1917 revolution.",
    width: 2.3,
    lane: 1,
    "x-offset": 0
  },
  {
    year: 1895.53,
    label: "Doukhobor crackdown after oath refusal",
    date: "July 10-11, 1895 (Gregorian)",
    details: "After refusing to swear allegiance to Nicholas II and burning their weapons, Doukhobor communities in Transcaucasia were attacked by Cossacks. The state then dispersed thousands into hostile villages, and many died from starvation and exposure.",
    width: 2.8,
    lane: -1,
    "x-offset": 0
  },
  {
    year: 1894.97,
    label: "Dreyfus Affair begins",
    date: "Dec 22, 1894",
    details: "Captain Alfred Dreyfus was convicted of treason in a case driven by anti-Semitism, secrecy, and fabricated evidence. The affair became a long political crisis that split France and exposed the fragility of republican justice and liberal institutions.",
    width: 2.6,
    lane: 2,
    "x-offset": 0
  },
  { year: 1904.11, label: "Russo-Japanese War begins", date: "Feb 8, 1904", width: 2.4, lane: 0, "x-offset": 0 },
  { year: 1905.06, label: "Bloody Sunday", date: "Jan 22, 1905", width: 2.2, lane: -2, "x-offset": 0 },
  { year: 1905.49, label: "Potemkin mutiny", date: "June 27, 1905", width: 2.2, lane: 2, "x-offset": 0 },
  {
    year: 1908.5,
    label: "Tunguska event",
    date: "June 30, 1908",
    details: "A massive explosion flattened forest over a huge area near the Tunguska River in Siberia, most likely after an asteroid or comet fragment burst in the atmosphere. It remains the largest impact event in recorded human history.",
    width: 2.4,
    lane: -1,
    "x-offset": 0
  },
  { year: 1910.89, label: "Leo Tolstoy dies", date: "Nov 20, 1910", width: 2.4, lane: 2, "x-offset": 0 },
  { year: 1914.57, label: "World War I begins", date: "July 28, 1914", width: 2.6, lane: -2, "x-offset": 0 },
  {
    year: 1917.18,
    label: "Women's Day strike in Petrograd",
    date: "Mar 8, 1917 (Gregorian; Feb 23 O.S.)",
    details: "On International Women's Day, as many as 90,000 female workers in Petrograd left their factory jobs and marched through the streets, shouting \"Bread\", \"Down with the autocracy!\", and \"Stop the War!\"",
    width: 2.4,
    lane: 1,
    "x-offset": 0
  },
  { year: 1917.2, label: "Tsar abdicates", date: "Mar 15, 1917", width: 2.4, lane: 2, "x-offset": 0 },
  { year: 1917.25, label: "Women gain suffrage", date: "March 1917, Provisional Government", width: 2.2, lane: -1, "x-offset": 0 },
  { year: 1917.85, label: "October Revolution", date: "Nov 7, 1917 (Gregorian calendar)", width: 3.4, lane: -1, "x-offset": 0 },
  {
    year: 1918.17,
    label: "Treaty of Brest-Litovsk",
    date: "March 3, 1918",
    details: "The Treaty of Brest-Litovsk was signed, and the Eastern Front ceased to be an active war zone.\n\nUnder the treaty, Soviet Russia ceded 34% of the former empire's population, 54% of its industrial land, 89% of its coalfields, and 26% of its railroads.",
    width: 2.6,
    lane: 1,
    "x-offset": 0
  },
  { year: 1918.19, label: "Allied landing at Murmansk", date: "Mar 9, 1918", width: 2.5, lane: -3, "x-offset": 0 },
  { year: 1918.26, label: "Japanese land at Vladivostok", date: "Apr 5, 1918", width: 2.5, lane: 3, "x-offset": 0 },
  { year: 1918.68, label: "U.S. troops reach Arkhangelsk", date: "Sep 4, 1918", width: 2.4, lane: 2, "x-offset": 0 },
  { year: 1918.86, label: "Armistice ends WWI", date: "Nov 11, 1918", width: 1.8, lane: 1, "x-offset": 0 },
  {
    year: 1921.25,
    label: "Russian famine of 1921 begins",
    date: "Spring 1921",
    details: "The famine of 1921-1922 emerged from drought, war communism, and the devastation left by years of civil war. It killed millions and exposed how badly revolution, requisitioning, and war had shattered the countryside and the food system.",
    width: 2.8,
    lane: -3,
    "x-offset": 0
  },
  {
    year: 1922.9,
    label: "Civil War ends; USSR founded",
    date: "Oct 25-Dec 30, 1922",
    details: "The Red Army's capture of Vladivostok on October 25, 1922 is usually treated as the end of the Russian Civil War. Within weeks, on December 30, the Union of Soviet Socialist Republics was formally created.\n\nTaken together, these events marked the Bolsheviks' transition from revolutionary survival and civil war victory into a consolidated new state, built after years of destruction, famine, and political repression.",
    width: 2.9,
    lane: 2,
    "x-offset": 0
  },
  {
    year: 1922.83,
    label: "Mussolini seizes power",
    date: "Oct 28-31, 1922",
    details: "The March on Rome brought Benito Mussolini to power after King Victor Emmanuel III refused to stop the fascists and instead appointed him prime minister. It marked one of the earliest major fascist seizures of state power in interwar Europe.",
    width: 2.6,
    lane: -1,
    "x-offset": 0
  },
  { year: 1924.06, label: "Lenin dies", date: "Jan 21, 1924", width: 1.8, lane: 1, "x-offset": 0 },
  { year: 1928.0, label: "Stalin consolidates power", date: "Approximate shorthand for the late-1920s turn", width: 2.2, lane: -1, "x-offset": 0 },
  {
    year: 1929.81,
    label: "Great Depression begins",
    date: "Oct 24, 1929",
    details: "The Wall Street crash of October 1929 is the usual marker for the start of the Great Depression. What followed was a global economic collapse marked by unemployment, bank failures, collapsing trade, and political radicalization across much of the world.",
    width: 2.7,
    lane: 1,
    "x-offset": 0
  },
  {
    year: 1930.19,
    label: "Dandi Salt March begins",
    date: "March 12, 1930",
    details: "Mahatma Gandhi set out from Sabarmati Ashram on the Dandi Salt March to challenge the British salt tax. The march became one of the defining acts of mass nonviolent resistance in the Indian independence movement.",
    width: 2.5,
    lane: 3,
    "x-offset": 0
  },
  {
    year: 1933.08,
    label: "Hitler becomes chancellor",
    date: "Jan 30, 1933",
    details: "President Paul von Hindenburg appointed Adolf Hitler chancellor of Germany. Conservative elites believed they could control him, but the appointment opened the path to rapid Nazi dictatorship.",
    width: 2.4,
    lane: -3,
    "x-offset": 0
  },
  {
    year: 1936.54,
    label: "Spanish Civil War begins",
    date: "July 17, 1936",
    details: "A military uprising against the Spanish Republic opened the Spanish Civil War. The conflict quickly became an international test ground for fascism, anti-fascism, bombing from the air, and Soviet-backed communist politics.",
    width: 2.5,
    lane: -4,
    "x-offset": 0
  },
  {
    year: 1937.05,
    label: "Trotsky reaches Mexico",
    date: "Jan 9, 1937",
    details: "After expulsion from the Soviet Union and years of exile across Turkey, France, and Norway, Leon Trotsky arrived in Mexico under the protection of Diego Rivera and Frida Kahlo. Mexico became the site of his last attempt to keep an anti-Stalinist revolutionary movement alive.",
    width: 2.2,
    lane: -2,
    "x-offset": 0
  },
  {
    year: 1937.32,
    label: "Bombing of Guernica",
    date: "Apr 26, 1937",
    details: "German and Italian aircraft bombed the Basque town of Guernica during the Spanish Civil War. The attack became one of the era's most famous symbols of deliberate terror from the air against civilians.",
    width: 2.4,
    lane: 1,
    "x-offset": 0
  },
  {
    year: 1937.52,
    label: "Marco Polo Bridge Incident",
    date: "July 7, 1937",
    details: "A clash between Japanese and Chinese troops near Beijing escalated into the Marco Polo Bridge Incident. It is usually treated as the opening of the full-scale Second Sino-Japanese War, which soon fused into the wider world crisis.",
    width: 2.6,
    lane: 4,
    "x-offset": 0
  },
  {
    year: 1938.19,
    label: "Anschluss",
    date: "March 12, 1938",
    details: "Nazi Germany annexed Austria in the Anschluss, destroying Austrian independence without a meaningful foreign response. The episode showed how weak the European powers' resistance to Hitler still was on the eve of war.",
    width: 2.0,
    lane: -1,
    "x-offset": 0
  },
  {
    year: 1939.36,
    label: "Battles of Khalkhin Gol begin",
    date: "May 11, 1939",
    details: "Fighting began along the Mongolian-Manchurian frontier in what became the Battles of Khalkhin Gol. The later Soviet victory over Japan helped shape Tokyo's decision to look south rather than attack Siberia in 1941.",
    width: 2.7,
    lane: 2,
    "x-offset": 0
  },
  {
    year: 1939.67,
    label: "World War II begins in Europe",
    date: "Sep 1, 1939",
    details: "Germany invaded Poland, beginning World War II in Europe. The invasion shattered the last illusions of peace after Munich and triggered declarations of war by Britain and France two days later.",
    width: 2.9,
    lane: -3,
    "x-offset": 0
  },
  {
    year: 1940.64,
    label: "Trotsky assassinated",
    date: "Aug 21, 1940",
    details: "Trotsky was murdered in Coyoacan after being attacked with an ice axe by the Stalinist agent Ramón Mercader. The killing showed how far Stalin was willing to extend Soviet power to eliminate a rival even in exile on another continent.",
    width: 2.4,
    lane: 2,
    "x-offset": 0
  },
  { year: 1941.47, label: "Operation Barbarossa", date: "June 22, 1941", width: 3.0, lane: 0, "x-offset": 0 },
  { year: 1943.09, label: "Sixth Army surrenders at Stalingrad", date: "Feb 2, 1943", width: 2.8, lane: 2, "x-offset": 0 },
  { year: 1945.36, label: "War ends in Europe", date: "May 8-9, 1945", width: 1.9, lane: 1, "x-offset": 0 },
  { year: 1949.66, label: "First Soviet atomic bomb", date: "Aug 29, 1949", width: 2.4, lane: -1, "x-offset": 0 },
  { year: 1953.18, label: "Stalin dies", date: "Mar 5, 1953", width: 2.2, lane: 0, "x-offset": 0 },
  { year: 1953.61, label: "First Soviet thermonuclear test", date: "Aug 12, 1953", width: 2.6, lane: 2, "x-offset": 0 },
  {
    year: 1955.84,
    label: "Vietnam War begins",
    date: "Nov 1, 1955",
    details: "This is the commonly used start date for the Vietnam War, marking the consolidation of conflict between communist North Vietnam and the U.S.-backed South. What began as a post-colonial struggle would grow into one of the central wars of the Cold War.",
    width: 2.6,
    lane: -4,
    "x-offset": 0
  },
  { year: 1957.76, label: "Sputnik 1", date: "Oct 4, 1957", width: 2.2, lane: -1, "x-offset": 0 },
  { year: 1959.7, label: "Luna 2 reaches the Moon", date: "Sep 14, 1959", width: 1.8, lane: 1, "x-offset": 0 },
  { year: 1961.28, label: "Gagarin orbits Earth", date: "Apr 12, 1961", width: 2.8, lane: -1, "x-offset": 0 },
  { year: 1963.46, label: "Valentina Tereshkova in space", date: "June 16, 1963", width: 2.4, lane: 2, "x-offset": 0 },
  { year: 1965.21, label: "Alexei Leonov spacewalk", date: "Mar 18, 1965", width: 1.8, lane: 1, "x-offset": 0 },
  {
    year: 1971.23,
    label: "Bangladesh Liberation War begins",
    date: "Mar 26, 1971",
    details: "The Bangladesh Liberation War began after the Pakistani army launched a brutal crackdown in East Pakistan following the Bengali independence movement. The war ended with the creation of Bangladesh and a major regional victory for India in December 1971.",
    width: 2.8,
    lane: 3,
    "x-offset": 0
  },
  {
    year: 1973.7,
    label: "Pinochet coup in Chile",
    date: "Sep 11, 1973",
    details: "The Chilean military overthrew Salvador Allende in a coup backed by the United States and led by Augusto Pinochet. The coup ushered in a dictatorship marked by executions, disappearances, torture, and exile.",
    width: 2.6,
    lane: -2,
    "x-offset": 0
  },
  {
    year: 1975.33,
    label: "Vietnam War ends",
    date: "Apr 30, 1975",
    details: "The fall of Saigon marked the end of the Vietnam War and the collapse of South Vietnam. It became one of the defining symbols of U.S. defeat and a major turning point in Cold War history.",
    width: 2.5,
    lane: 1,
    "x-offset": 0
  },
  { year: 1991.98, label: "USSR dissolves", date: "Dec 26, 1991", width: 3.4, lane: 0, "x-offset": 0 }
];

const fallbackEventLinks = {
  "Serfdom abolished": "https://en.wikipedia.org/wiki/Emancipation_reform_of_1861",
  "American Civil War ends": "https://en.wikipedia.org/wiki/Appomattox_Campaign",
  "Narodnik movement rises": "https://en.wikipedia.org/wiki/Narodniks",
  "Russo-Turkish War begins": "https://en.wikipedia.org/wiki/Russo-Turkish_War_(1877%E2%80%931878)",
  "Alexander II assassinated": "https://en.wikipedia.org/wiki/Alexander_II_of_Russia#Assassination",
  "Alexander III reaction": "https://en.wikipedia.org/wiki/Alexander_III_of_Russia",
  "Krakatoa erupts": "https://en.wikipedia.org/wiki/1883_eruption_of_Krakatoa",
  "Berlin Conference opens": "https://en.wikipedia.org/wiki/Berlin_Conference",
  "Russian famine begins": "https://en.wikipedia.org/wiki/Russian_famine_of_1891%E2%80%931892",
  "New Zealand women win the vote": "https://en.wikipedia.org/wiki/Women%27s_suffrage_in_New_Zealand",
  "Nicholas II takes throne": "https://en.wikipedia.org/wiki/Nicholas_II",
  "Doukhobor crackdown after oath refusal": "https://en.wikipedia.org/wiki/Doukhobors",
  "Dreyfus Affair begins": "https://en.wikipedia.org/wiki/Dreyfus_affair",
  "Russo-Japanese War begins": "https://en.wikipedia.org/wiki/Russo-Japanese_War",
  "Bloody Sunday": "https://en.wikipedia.org/wiki/Bloody_Sunday_(1905)",
  "Potemkin mutiny": "https://en.wikipedia.org/wiki/Russian_battleship_Potemkin#Mutiny",
  "Tunguska event": "https://en.wikipedia.org/wiki/Tunguska_event",
  "Leo Tolstoy dies": "https://en.wikipedia.org/wiki/Leo_Tolstoy",
  "World War I begins": "https://en.wikipedia.org/wiki/World_War_I",
  "Women's Day strike in Petrograd": "https://en.wikipedia.org/wiki/February_Revolution",
  "Tsar abdicates": "https://en.wikipedia.org/wiki/Abdication_of_Nicholas_II",
  "Women gain suffrage": "https://en.wikipedia.org/wiki/Women%27s_suffrage#Russia",
  "October Revolution": "https://en.wikipedia.org/wiki/October_Revolution",
  "Treaty of Brest-Litovsk": "https://en.wikipedia.org/wiki/Treaty_of_Brest-Litovsk",
  "Allied landing at Murmansk": "https://en.wikipedia.org/wiki/North_Russia_intervention",
  "Japanese land at Vladivostok": "https://en.wikipedia.org/wiki/Siberian_intervention",
  "U.S. troops reach Arkhangelsk": "https://en.wikipedia.org/wiki/American_Expeditionary_Force,_North_Russia",
  "Armistice ends WWI": "https://en.wikipedia.org/wiki/Armistice_of_11_November_1918",
  "Russian famine of 1921 begins": "https://en.wikipedia.org/wiki/Russian_famine_of_1921%E2%80%931922",
  "Civil War ends; USSR founded": "https://en.wikipedia.org/wiki/Treaty_on_the_Creation_of_the_Union_of_Soviet_Socialist_Republics",
  "Mussolini seizes power": "https://en.wikipedia.org/wiki/March_on_Rome",
  "Lenin dies": "https://en.wikipedia.org/wiki/Vladimir_Lenin",
  "Stalin consolidates power": "https://en.wikipedia.org/wiki/Joseph_Stalin%27s_rise_to_power",
  "Great Depression begins": "https://en.wikipedia.org/wiki/Great_Depression",
  "Dandi Salt March begins": "https://en.wikipedia.org/wiki/Salt_March",
  "Hitler becomes chancellor": "https://en.wikipedia.org/wiki/Adolf_Hitler%27s_rise_to_power#Seizure_of_control_(1931%E2%80%931933)",
  "Spanish Civil War begins": "https://en.wikipedia.org/wiki/Spanish_Civil_War",
  "Trotsky reaches Mexico": "https://en.wikipedia.org/wiki/Leon_Trotsky#Exile_to_Mexico",
  "Bombing of Guernica": "https://en.wikipedia.org/wiki/Bombing_of_Guernica",
  "Marco Polo Bridge Incident": "https://en.wikipedia.org/wiki/Marco_Polo_Bridge_Incident",
  "Anschluss": "https://en.wikipedia.org/wiki/Anschluss",
  "Battles of Khalkhin Gol begin": "https://en.wikipedia.org/wiki/Battles_of_Khalkhin_Gol",
  "World War II begins in Europe": "https://en.wikipedia.org/wiki/Invasion_of_Poland",
  "Trotsky assassinated": "https://en.wikipedia.org/wiki/Leon_Trotsky#Assassination",
  "Operation Barbarossa": "https://en.wikipedia.org/wiki/Operation_Barbarossa",
  "Sixth Army surrenders at Stalingrad": "https://en.wikipedia.org/wiki/Battle_of_Stalingrad",
  "War ends in Europe": "https://en.wikipedia.org/wiki/Victory_in_Europe_Day",
  "First Soviet atomic bomb": "https://en.wikipedia.org/wiki/RDS-1",
  "Stalin dies": "https://en.wikipedia.org/wiki/Joseph_Stalin",
  "First Soviet thermonuclear test": "https://en.wikipedia.org/wiki/RDS-6s",
  "Vietnam War begins": "https://en.wikipedia.org/wiki/Vietnam_War",
  "Sputnik 1": "https://en.wikipedia.org/wiki/Sputnik_1",
  "Luna 2 reaches the Moon": "https://en.wikipedia.org/wiki/Luna_2",
  "Gagarin orbits Earth": "https://en.wikipedia.org/wiki/Vostok_1",
  "Valentina Tereshkova in space": "https://en.wikipedia.org/wiki/Vostok_6",
  "Alexei Leonov spacewalk": "https://en.wikipedia.org/wiki/Voskhod_2",
  "Bangladesh Liberation War begins": "https://en.wikipedia.org/wiki/Bangladesh_Liberation_War",
  "Pinochet coup in Chile": "https://en.wikipedia.org/wiki/1973_Chilean_coup_d%27%C3%A9tat",
  "Vietnam War ends": "https://en.wikipedia.org/wiki/Fall_of_Saigon",
  "USSR dissolves": "https://en.wikipedia.org/wiki/Dissolution_of_the_Soviet_Union"
};

const timelineStage = document.getElementById("timelineStage");
const timelineScroll = document.getElementById("timelineScroll");
const timelineRail = document.getElementById("timelineRail");
const timeline = document.getElementById("timeline");
const peopleStrip = document.getElementById("peopleStrip");
const peopleStripWrap = document.getElementById("peopleStripWrap");
const peopleStripScroller = document.getElementById("peopleStripScroller");
const headerPile = document.getElementById("headerPile");
const footerPile = document.getElementById("footerPile");
const tooltip = document.getElementById("tooltip");
const textMeasureCanvas = document.createElement("canvas");
const textMeasureContext = textMeasureCanvas.getContext("2d");

const layout = {
  startYear: 1861,
  endYear: 1980,
  leftRail: 108,
  rightRail: 36,
  topBand: 64,
  bottomBand: 80,
  columnWidth: 72,
  yearHeight: 40,
  maxEventWidth: 156,
  eventCardWidth: 252,
  eventImageWidth: 132,
  eventImageHeight: 96,
  eventInset: 18,
  eventLaneMin: -5,
  eventLaneMax: 5
};

const collapseLayout = {
  transitionYears: 3.5,
  minWidth: 12
};

const validFates = new Set(["pre", "purged", "survived"]);

const timelineAnnotationMeta = {
  exile: {
    label: "Exile from Russia",
    color: "rgba(126, 177, 232, 0.96)",
    halo: "rgba(126, 177, 232, 0.22)"
  },
  gulag: {
    label: "In the Gulag",
    color: "rgba(120, 174, 187, 0.96)",
    halo: "rgba(120, 174, 187, 0.24)"
  },
  repression: {
    label: "Purge imprisonment / internal exile",
    color: "rgba(214, 162, 127, 0.96)",
    halo: "rgba(214, 162, 127, 0.24)"
  }
};

let people = [];
let events = [];
let pileImages = normalizePileImages(builtInPileImagesData);
let scrollLayoutFrame = 0;
let chartHeight = 0;
let mainChartWidth = 0;
let stageWidth = 0;
let timelineEventLinesLayer = null;
let timelineEventLabelsLayer = null;
let timelinePeopleLayer = null;
let timelinePersonNodes = [];
let peopleStripNodes = [];
let lastDynamicSignature = "";
let syncingHorizontalScroll = false;
const pileLayoutSeed = createLoadRandomSeed();

window.addEventListener("resize", render);
window.addEventListener("scroll", handleWindowScroll, { passive: true });
if (peopleStripScroller) {
  peopleStripScroller.addEventListener("scroll", handlePeopleStripScroll, { passive: true });
}
if (timelineScroll) {
  timelineScroll.addEventListener("scroll", handleTimelineScroll, { passive: true });
}

init();

async function init() {
  const [loadedPeople, loadedEvents, loadedPileImages] = await Promise.all([
    loadPeople(),
    loadEvents(),
    loadPileImages()
  ]);
  people = loadedPeople;
  events = loadedEvents;
  pileImages = loadedPileImages;
  render();
}

function render() {
  if (people.length === 0) {
    return;
  }

  updateLayout();

  chartHeight = layout.topBand + Math.ceil((layout.endYear - layout.startYear) * layout.yearHeight) + layout.bottomBand;
  const scrollViewportWidth = timelineScroll?.clientWidth || Math.max(0, window.innerWidth - 40);
  const minMainWidth = Math.max(0, scrollViewportWidth - layout.leftRail);
  const expandedPeopleWidth = people.length * layout.columnWidth;
  mainChartWidth = Math.max(minMainWidth, Math.ceil(expandedPeopleWidth + layout.rightRail));
  stageWidth = layout.leftRail + mainChartWidth;

  timelineRail.setAttribute("viewBox", `0 0 ${layout.leftRail} ${chartHeight}`);
  timelineRail.setAttribute("width", layout.leftRail);
  timelineRail.setAttribute("height", chartHeight);
  timelineRail.style.width = `${layout.leftRail}px`;
  timelineRail.style.height = `${chartHeight}px`;

  timelineRail.innerHTML = [
    buildDefs(),
    buildBackground(layout.leftRail, chartHeight),
    buildRailGrid(),
    buildAxisLabel()
  ].join("");

  timelineStage.style.width = `${stageWidth}px`;
  timeline.setAttribute("viewBox", `0 0 ${mainChartWidth} ${chartHeight}`);
  timeline.setAttribute("width", mainChartWidth);
  timeline.setAttribute("height", chartHeight);
  timeline.style.width = `${mainChartWidth}px`;
  timeline.style.height = `${chartHeight}px`;
  timeline.innerHTML = [
    buildDefs(),
    buildBackground(mainChartWidth, chartHeight),
    buildMainGrid(mainChartWidth),
    buildMainEventLines(mainChartWidth),
    `<g id="peopleLayer"></g>`,
    buildMainEventLabels(mainChartWidth)
  ].join("");
  timelineEventLinesLayer = timeline.querySelector("#mainEventLinesLayer");
  timelineEventLabelsLayer = timeline.querySelector("#mainEventLabelsLayer");
  timelinePeopleLayer = timeline.querySelector("#peopleLayer");

  const initialFocusYear = currentFocusYear();
  const initialScrollLeft = currentHorizontalScrollLeft();
  const initialColumnMetrics = computeColumnMetrics(people, initialFocusYear, initialScrollLeft);

  renderPeopleStrip(people, stageWidth, initialColumnMetrics);
  timelinePeopleLayer.innerHTML = buildPeople(people, initialColumnMetrics);
  cacheDynamicNodes();
  bindDynamicInteractions();
  renderPhotoPiles();
  lastDynamicSignature = "";
  updateScrollDrivenLayout(true);
}

function updateLayout() {
  const viewportHeight = window.innerHeight || 900;
  const viewportWidth = window.innerWidth || 1400;

  layout.startYear = people.length ? Math.min(...people.map((person) => person.born)) : 1861;
  layout.yearHeight = Math.max(36, Math.ceil(viewportHeight / 20));
  layout.columnWidth = viewportWidth < 720 ? 64 : viewportWidth < 1200 ? 68 : 72;
  layout.leftRail = viewportWidth < 720 ? 86 : 108;
  layout.topBand = viewportWidth < 720 ? 58 : 64;
  layout.maxEventWidth = viewportWidth < 720 ? 112 : 156;
  layout.eventCardWidth = viewportWidth < 720 ? 208 : 252;
  layout.eventImageWidth = viewportWidth < 720 ? 112 : 132;
  layout.eventImageHeight = viewportWidth < 720 ? 80 : 96;
  layout.eventInset = viewportWidth < 720 ? 12 : 18;
}

async function loadPeople() {
  try {
    const response = await fetch(PEOPLE_URL, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load ${PEOPLE_URL}: ${response.status}`);
    }
    const json = await response.json();
    return normalizePeople(json);
  } catch (error) {
    console.warn("Falling back to built-in people data.", error);
    return normalizePeople(fallbackPeopleData);
  }
}

async function loadEvents() {
  try {
    const response = await fetch(EVENTS_URL, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load ${EVENTS_URL}: ${response.status}`);
    }
    const json = await response.json();
    return normalizeEvents(json);
  } catch (error) {
    console.warn("Falling back to built-in event data.", error);
    return normalizeEvents(fallbackEventsData.map((event) => ({
      ...event,
      link: fallbackEventLinks[event.label] ?? ""
    })));
  }
}

async function loadPileImages() {
  try {
    const response = await fetch("images/", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load images directory listing: ${response.status}`);
    }
    const html = await response.text();
    const discovered = extractPileImagesFromDirectoryIndex(html);

    if (!discovered.header.length && !discovered.footer.length) {
      throw new Error("No header/footer images found in images directory listing.");
    }

    return normalizePileImages(discovered);
  } catch (error) {
    console.warn("Falling back to built-in pile image data.", error);
    return normalizePileImages(builtInPileImagesData);
  }
}

function normalizePeople(data) {
  if (!Array.isArray(data)) {
    throw new Error("People data must be an array.");
  }

  return data
    .map((person) => {
      const born = Number(person.birthYear);
      const died = Number(person.deathYear);

      return {
        name: String(person.name ?? "").trim(),
        born,
        died,
        photoPath: String(person.photoPath ?? "").trim(),
        wikipediaUrl: normalizeWikipediaUrl(person.wikipediaUrl, person.name),
        placeOfBirth: String(person.placeOfBirth ?? "").trim(),
        howDied: String(person.howDied ?? "").trim(),
        fate: String(person.fate ?? "pre").trim(),
        note: String(person.note ?? "").trim(),
        tooltipText: String(person.tooltipText ?? person.summary ?? person.note ?? "").trim(),
        timelineAnnotations: normalizeTimelineAnnotations(
          person.timelineAnnotations ?? person.annotations,
          born,
          died
        )
      };
    })
    .filter((person) => (
      person.name
      && Number.isFinite(person.born)
      && Number.isFinite(person.died)
      && person.died >= person.born
      && validFates.has(person.fate)
    ))
    .sort((a, b) => (a.died - b.died) || (a.born - b.born) || a.name.localeCompare(b.name));
}

function normalizeTimelineAnnotations(value, born, died) {
  if (!Array.isArray(value) || !Number.isFinite(born) || !Number.isFinite(died)) {
    return [];
  }

  return value
    .map((annotation) => {
      const type = String(annotation?.type ?? annotation?.kind ?? "").trim().toLowerCase();
      const meta = timelineAnnotationMeta[type];
      const start = Number(annotation?.startYear ?? annotation?.start ?? annotation?.fromYear);
      const end = Number(annotation?.endYear ?? annotation?.end ?? annotation?.toYear);

      return {
        type,
        start,
        end,
        label: String(annotation?.label ?? meta?.label ?? "").trim(),
        details: String(annotation?.details ?? annotation?.note ?? "").trim(),
        color: String(annotation?.color ?? meta?.color ?? "").trim(),
        halo: String(annotation?.halo ?? meta?.halo ?? "").trim()
      };
    })
    .filter((annotation) => (
      annotation.type
      && annotation.label
      && Number.isFinite(annotation.start)
      && Number.isFinite(annotation.end)
      && annotation.end >= annotation.start
    ))
    .map((annotation) => ({
      ...annotation,
      start: clamp(annotation.start, born, died),
      end: clamp(annotation.end, born, died)
    }))
    .filter((annotation) => annotation.end >= annotation.start)
    .sort((left, right) => left.start - right.start || left.end - right.end || left.label.localeCompare(right.label));
}

function normalizeEvents(data) {
  if (!Array.isArray(data)) {
    throw new Error("Event data must be an array.");
  }

  return data
    .map((event) => ({
      year: Number(event.year),
      label: String(event.label ?? ""),
      date: String(event.date ?? event.detail ?? ""),
      details: String(event.details ?? "").trim(),
      image: normalizeEventImage(event.image),
      link: normalizeLink(event.link),
      width: Number(event.width ?? 2),
      lane: Number(event.lane ?? 0),
      xOffset: Number(event["x-offset"] ?? event.xOffset ?? 0)
    }))
    .filter((event) => (
      Number.isFinite(event.year)
      && event.label
      && event.date
      && Number.isFinite(event.width)
      && Number.isFinite(event.lane)
      && Number.isFinite(event.xOffset)
    ))
    .sort((a, b) => a.year - b.year);
}

function normalizePileImages(data) {
  const source = data && typeof data === "object" ? data : builtInPileImagesData;

  return {
    header: normalizePileImageList(source.header),
    footer: normalizePileImageList(source.footer)
  };
}

function normalizePileImageList(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => {
      if (typeof entry === "string") {
        return entry.trim();
      }

      if (entry && typeof entry === "object") {
        return String(entry.image_path ?? entry.imagePath ?? entry.path ?? "").trim();
      }

      return "";
    })
    .filter(Boolean)
    .sort((left, right) => left.localeCompare(right));
}

function extractPileImagesFromDirectoryIndex(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(String(html ?? ""), "text/html");
  const fileNames = Array.from(doc.querySelectorAll("a[href]"))
    .map((link) => String(link.getAttribute("href") ?? "").trim())
    .map((href) => href.split("#")[0].split("?")[0])
    .map((href) => href.replace(/^\.\//, ""))
    .filter((href) => href && !href.endsWith("/"))
    .map((href) => decodeURIComponent(href));

  return {
    header: fileNames
      .filter((name) => /^header/i.test(name))
      .map((name) => `images/${name}`),
    footer: fileNames
      .filter((name) => /^footer/i.test(name))
      .map((name) => `images/${name}`)
  };
}

function buildDefs() {
  return `
    <defs>
      <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="rgba(0, 0, 0, 0.28)"></feDropShadow>
      </filter>
      <filter id="agedPhoto" x="-16%" y="-16%" width="132%" height="132%">
        <feColorMatrix
          type="matrix"
          values="0.81 0.14 0.05 0 0.04
                  0.07 0.71 0.04 0 0.03
                  0.03 0.18 0.58 0 0.02
                  0    0    0    1 0"
          result="toned"
        ></feColorMatrix>
        <feComponentTransfer in="toned" result="weathered">
          <feFuncR type="gamma" amplitude="0.96" exponent="1.05" offset="0"></feFuncR>
          <feFuncG type="gamma" amplitude="0.95" exponent="1.04" offset="0"></feFuncG>
          <feFuncB type="gamma" amplitude="0.93" exponent="1.02" offset="0"></feFuncB>
        </feComponentTransfer>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="noise"></feTurbulence>
        <feDisplacementMap
          in="weathered"
          in2="noise"
          scale="0.55"
          xChannelSelector="R"
          yChannelSelector="G"
          result="warped"
        ></feDisplacementMap>
        <feDropShadow dx="0" dy="10" stdDeviation="8" flood-color="#000000" flood-opacity="0.26"></feDropShadow>
      </filter>
      <filter id="photoBorder" x="-10%" y="-10%" width="120%" height="120%">
        <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="expanded"></feMorphology>
        <feFlood flood-color="#faf7f0" flood-opacity="0.92" result="ink"></feFlood>
        <feComposite in="ink" in2="expanded" operator="in" result="border"></feComposite>
      </filter>
      <pattern id="paperDots" patternUnits="userSpaceOnUse" width="12" height="12">
        <circle cx="2" cy="2" r="0.8" fill="${cssVar("--grid")}"></circle>
      </pattern>
      <pattern id="photoGrain" patternUnits="userSpaceOnUse" width="24" height="24">
        <circle cx="3" cy="4" r="0.65" fill="${cssVar("--ink-strong")}" fill-opacity="0.07"></circle>
        <circle cx="15" cy="8" r="0.55" fill="${cssVar("--paper-shadow")}" fill-opacity="0.12"></circle>
        <circle cx="8" cy="15" r="0.75" fill="${cssVar("--ink")}" fill-opacity="0.06"></circle>
        <circle cx="20" cy="18" r="0.6" fill="${cssVar("--paper-shadow")}" fill-opacity="0.1"></circle>
      </pattern>
      <linearGradient id="photoWash" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${cssVar("--ink-strong")}" stop-opacity="0.14"></stop>
        <stop offset="45%" stop-color="${cssVar("--ink")}" stop-opacity="0.04"></stop>
        <stop offset="100%" stop-color="${cssVar("--paper-shadow")}" stop-opacity="0.18"></stop>
      </linearGradient>
    </defs>
  `;
}

function buildBackground(chartWidth, chartHeight) {
  return `
    <rect x="0" y="0" width="${chartWidth}" height="${chartHeight}" fill="${cssVar("--chart-surface")}"></rect>
    <rect x="0" y="0" width="${chartWidth}" height="${chartHeight}" fill="url(#paperDots)"></rect>
    <rect x="0" y="0" width="${chartWidth}" height="${layout.topBand}" fill="${cssVar("--chart-top")}"></rect>
  `;
}

function renderPhotoPiles() {
  renderPhotoPile(headerPile, pileImages.header, "header");
  renderPhotoPile(footerPile, pileImages.footer, "footer");
}

function renderPhotoPile(node, imagePaths, kind) {
  if (!node) {
    return;
  }

  if (!Array.isArray(imagePaths) || imagePaths.length === 0) {
    node.innerHTML = "";
    node.classList.add("is-empty");
    return;
  }

  const pileWidth = Math.max(node.clientWidth || 0, window.innerWidth || 0, 480);
  const placements = computePhotoPilePlacements(imagePaths, kind, pileWidth);
  node.classList.remove("is-empty");
  node.innerHTML = placements.map((placement, index) => buildPhotoPileCard(placement, index)).join("");
}

function buildPhotoPileCard(placement, index) {
  const {
    imagePath,
    left,
    top,
    rotation,
    maxWidth,
    maxHeight,
    zIndex
  } = placement;

  return `
    <div
      class="pile-photo-card"
      style="left:${left}%; top:${top}px; --pile-rotate:${rotation}deg; --pile-max-width:${maxWidth}px; --pile-max-height:${maxHeight}px; --pile-z:${zIndex};"
    >
      <div class="pile-photo-frame">
        <span class="pile-photo-image-wrap">
          <img
            class="pile-photo-image"
            src="${escapeAttr(encodeURI(String(imagePath)))}"
            alt=""
            loading="lazy"
            decoding="async"
          >
        </span>
      </div>
    </div>
  `;
}

function computePhotoPilePlacements(imagePaths, kind, pileWidth) {
  const expandedImagePaths = expandPileImagePaths(imagePaths, kind, pileWidth);
  const metrics = photoPileMetrics(kind, expandedImagePaths.length, pileWidth);
  const descriptors = expandedImagePaths.map((imagePath, index) => {
    const seed = hashString(`${kind}:${imagePath}:${index}:${pileLayoutSeed}`);
    const maxWidth = Math.round(lerp(metrics.widthRange[0], metrics.widthRange[1], seededUnit(seed, 1)));
    const maxHeight = Math.round(lerp(metrics.heightRange[0], metrics.heightRange[1], seededUnit(seed, 2)));

    return {
      imagePath,
      index,
      seed,
      rotation: lerp(-17.5, 17.5, seededUnit(seed, 3)).toFixed(2),
      maxWidth,
      maxHeight,
      footprintWidth: maxWidth + metrics.framePaddingX,
      footprintHeight: maxHeight + metrics.framePaddingY,
      zIndex: 12 + Math.round(lerp(0, 18, seededUnit(seed, 4)))
    };
  });

  const placements = placePileDescriptors(descriptors, metrics, kind);

  return placements
    .sort((left, right) => left.index - right.index)
    .map((placement) => ({
      imagePath: placement.imagePath,
      left: (placement.centerX / metrics.width) * 100,
      top: placement.centerY,
      rotation: placement.rotation,
      maxWidth: placement.maxWidth,
      maxHeight: placement.maxHeight,
      zIndex: placement.zIndex
    }));
}

function expandPileImagePaths(imagePaths, kind, pileWidth) {
  if (!imagePaths.length) {
    return [];
  }

  const base = [...imagePaths].sort((left, right) => left.localeCompare(right));
  const targetCount = Math.max(base.length, pileTileSlotCount(kind, pileWidth));
  const offset = hashString(`${kind}:pile-offset:${base.length}:${pileLayoutSeed}`) % base.length;
  const step = chooseCoPrimeStep(base.length);
  const expanded = [];

  for (let index = 0; index < targetCount; index += 1) {
    expanded.push(base[(offset + index * step) % base.length]);
  }

  return expanded;
}

function photoPileMetrics(kind, count, pileWidth) {
  const viewportWidth = window.innerWidth || pileWidth || 1400;
  const height = kind === "header"
    ? (viewportWidth < 640 ? 156 : viewportWidth < 960 ? 184 : 208)
    : (viewportWidth < 640 ? 236 : viewportWidth < 960 ? 276 : 314);

  return {
    kind,
    count,
    width: pileWidth,
    height,
    edgePaddingX: 0,
    edgePaddingY: 0,
    bleedX: kind === "header" ? 244 : 184,
    bleedY: kind === "header" ? 72 : 48,
    visibleEdgeBandWidth: kind === "header" ? 164 : 126,
    framePaddingX: kind === "header" ? 24 : 22,
    framePaddingY: kind === "header" ? 38 : 34,
    widthRange: kind === "header"
      ? (count >= 12 ? [156, 194] : count >= 9 ? [166, 206] : [176, 220])
      : (count >= 9 ? [134, 170] : [146, 184]),
    heightRange: kind === "header"
      ? (count >= 12 ? [112, 148] : count >= 9 ? [120, 158] : [128, 168])
      : (count >= 9 ? [96, 124] : [106, 134]),
    poissonAttemptsPerPoint: kind === "header" ? 30 : 26,
    poissonTopUpCandidates: kind === "header" ? 88 : 72
  };
}

function placePileDescriptors(descriptors, metrics, kind) {
  const ordered = [...descriptors].sort((left, right) => {
    const rankDelta = seededUnit(left.seed, 71) - seededUnit(right.seed, 71);

    if (Math.abs(rankDelta) > 0.0001) {
      return rankDelta;
    }

    return left.seed - right.seed;
  });
  const slots = buildPileTileSlots(metrics, ordered.length, kind);

  return ordered.map((descriptor, index) => {
    const slot = slots[index % slots.length];
    const xJitter = lerp(-slot.cellWidth * 0.18, slot.cellWidth * 0.18, seededUnit(descriptor.seed, 11));
    const yJitter = lerp(-slot.rowJitter, slot.rowJitter, seededUnit(descriptor.seed, 12));
    const edgePush = slot.edgeBias * lerp(slot.cellWidth * 0.04, slot.cellWidth * 0.22, seededUnit(descriptor.seed, 13));

    return {
      ...descriptor,
      centerX: slot.x + xJitter + edgePush,
      centerY: clamp(
        slot.y + yJitter,
        -metrics.bleedY * 0.5,
        metrics.height + metrics.bleedY * 0.7
      )
    };
  });
}

function pileTileSlotCount(kind, pileWidth) {
  const bleedX = kind === "header" ? 244 : 184;
  const rowCount = 2;
  const virtualWidth = pileWidth + bleedX * 2;
  const idealCellWidth = kind === "header" ? 188 : 162;
  const columnCount = Math.max(4, Math.ceil(virtualWidth / idealCellWidth) + 1);

  return columnCount * rowCount;
}

function buildPileTileSlots(metrics, count, kind) {
  const rowCount = 2;
  const columnCount = Math.max(1, Math.ceil(count / rowCount));
  const virtualWidth = metrics.width + metrics.bleedX * 2;
  const cellWidth = virtualWidth / columnCount;
  const rowAnchors = kind === "header" ? [0.32, 0.76] : [0.34, 0.78];
  const rowJitter = kind === "header" ? 26 : 20;
  const rowOffsets = kind === "header" ? [-0.2, 0.18] : [-0.18, 0.16];
  const slots = [];

  for (let column = 0; column < columnCount; column += 1) {
    for (let row = 0; row < rowCount; row += 1) {
      const edgeBias = column <= 1
        ? -1
        : column >= columnCount - 2
          ? 1
          : 0;

      slots.push({
        x: -metrics.bleedX + (column + 0.5 + rowOffsets[row]) * cellWidth,
        y: rowAnchors[row] * metrics.height + lerp(-metrics.bleedY * 0.16, metrics.bleedY * 0.2, row / Math.max(1, rowCount - 1)),
        cellWidth,
        rowJitter,
        edgeBias
      });
    }
  }

  return slots;
}

function generatePoissonPilePoints(metrics, count, kind) {
  const innerWidth = Math.max(24, metrics.width - metrics.edgePaddingX * 2 + metrics.bleedX * 2);
  const innerHeight = Math.max(24, metrics.height - metrics.edgePaddingY * 2 + metrics.bleedY * 2);
  const seed = hashString(`${kind}:poisson:${metrics.width}:${metrics.height}:${count}:${pileLayoutSeed}`);
  const targetArea = innerWidth * innerHeight;
  let radius = Math.max(
    30,
    Math.sqrt(targetArea / (Math.max(1, count) * Math.PI)) * 0.86
  );
  let points = [];

  for (let pass = 0; pass < 6; pass += 1) {
    const rng = createSeededRng(seed + pass * 1009);
    points = runPoissonDiskSampling(
      innerWidth,
      innerHeight,
      radius,
      metrics.poissonAttemptsPerPoint,
      rng
    );

    if (points.length >= count) {
      break;
    }

    radius *= 0.88;
  }

  if (points.length < count) {
    const rng = createSeededRng(seed + 9001);
    points = topUpPoissonPoints(
      points,
      count,
      innerWidth,
      innerHeight,
      metrics.poissonTopUpCandidates,
      rng
    );
  }

  const edgeAnchors = buildPileEdgeAnchorPoints(metrics, count, kind);
  return [...points, ...edgeAnchors].map((point, index) => ({
    id: `${kind}-${index}`,
    x: point.x + metrics.edgePaddingX - metrics.bleedX,
    y: point.y + metrics.edgePaddingY - metrics.bleedY
  }));
}

function selectPoissonPlacement(descriptor, availablePoints, placed, metrics, kind) {
  const xMin = metrics.edgePaddingX - metrics.bleedX + descriptor.footprintWidth / 2;
  const xMax = metrics.width - metrics.edgePaddingX + metrics.bleedX - descriptor.footprintWidth / 2;
  const yMin = metrics.edgePaddingY - metrics.bleedY + descriptor.footprintHeight / 2;
  const yMax = metrics.height - metrics.edgePaddingY + metrics.bleedY - descriptor.footprintHeight / 2;
  const points = availablePoints.length
    ? availablePoints
    : [{
      id: `${kind}-fallback-${descriptor.index}`,
      x: lerp(xMin, xMax, seededUnit(descriptor.seed, 30)),
      y: lerp(yMin, yMax, seededUnit(descriptor.seed, 31))
    }];
  let bestIndex = 0;
  let bestPlacement = null;
  let bestScore = -Infinity;

  points.forEach((point, index) => {
    const centerX = clamp(point.x, xMin, xMax);
    const centerY = clamp(point.y, yMin, yMax);
    const candidate = { centerX, centerY };
    const score = scorePileCandidate(candidate, descriptor, placed, metrics, point);

    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
      bestPlacement = {
        ...descriptor,
        centerX,
        centerY
      };
    }
  });

  if (availablePoints.length) {
    availablePoints.splice(bestIndex, 1);
  }

  return bestPlacement;
}

function scorePileCandidate(candidate, descriptor, placed, metrics, point) {
  const nearestGap = placed.length
    ? Math.min(...placed.map((other) => pilePlacementGap(candidate, descriptor, other)))
    : Math.min(metrics.width, metrics.height);
  const clampPenalty = point
    ? Math.hypot(candidate.centerX - point.x, candidate.centerY - point.y)
    : 0;
  const horizontalEdgeDistance = Math.min(
    candidate.centerX + descriptor.footprintWidth / 2,
    metrics.width - (candidate.centerX - descriptor.footprintWidth / 2)
  );
  const verticalEdgeDistance = Math.min(
    candidate.centerY + descriptor.footprintHeight / 2,
    metrics.height - (candidate.centerY - descriptor.footprintHeight / 2)
  );
  const horizontalEdgeProximity = 1 - clamp(horizontalEdgeDistance / Math.max(1, metrics.width * 0.52), 0, 1);
  const verticalEdgeProximity = 1 - clamp(verticalEdgeDistance / Math.max(1, metrics.height * 0.8), 0, 1);
  const topEdgeDistance = candidate.centerY + descriptor.footprintHeight / 2;
  const topEdgeProximity = 1 - clamp(topEdgeDistance / Math.max(1, metrics.height * 0.46), 0, 1);
  const edgeProximity = horizontalEdgeProximity * 0.92 + verticalEdgeProximity * 0.42 + topEdgeProximity * 1.18;
  const centerDx = Math.abs(candidate.centerX - metrics.width / 2) / Math.max(1, metrics.width * 0.5);
  const centerDy = Math.abs(candidate.centerY - metrics.height / 2) / Math.max(1, metrics.height * 0.5);
  const centerProximity = 1 - clamp(Math.hypot(centerDx * 0.92, centerDy * 1.08), 0, 1);
  const positionAffinity = lerp(-0.58, 0.94, seededUnit(descriptor.seed, 52));
  const positionBiasScore = positionAffinity >= 0
    ? edgeProximity * positionAffinity * 8.5
    : centerProximity * (-positionAffinity) * 9.4;
  const candidateLeft = candidate.centerX - descriptor.footprintWidth / 2;
  const candidateRight = candidate.centerX + descriptor.footprintWidth / 2;
  const leftEdgeCoverage = intervalOverlapLength(
    candidateLeft,
    candidateRight,
    -metrics.bleedX * 0.36,
    metrics.visibleEdgeBandWidth
  );
  const rightEdgeCoverage = intervalOverlapLength(
    candidateLeft,
    candidateRight,
    metrics.width - metrics.visibleEdgeBandWidth,
    metrics.width + metrics.bleedX * 0.36
  );
  const leftOutside = Math.max(0, -candidateLeft);
  const rightOutside = Math.max(0, candidateRight - metrics.width);
  const ambientEdgeCoverage = Math.min(leftEdgeCoverage + rightEdgeCoverage, metrics.visibleEdgeBandWidth * 1.4) * 0.015;
  let targetEdgeScore = 0;

  if (descriptor.edgeTarget) {
    const targetLeft = descriptor.edgeTarget.startsWith("left");
    const outerTarget = descriptor.edgeTarget.endsWith("outer");
    const targetCoverage = targetLeft ? leftEdgeCoverage : rightEdgeCoverage;
    const oppositeCoverage = targetLeft ? rightEdgeCoverage : leftEdgeCoverage;
    const targetOutside = targetLeft ? leftOutside : rightOutside;
    const targetWeight = outerTarget ? 1 : 0.72;

    targetEdgeScore += Math.min(targetCoverage, metrics.visibleEdgeBandWidth) * 0.094 * targetWeight;
    targetEdgeScore += Math.min(targetOutside, metrics.visibleEdgeBandWidth) * 0.086 * targetWeight;
    targetEdgeScore -= oppositeCoverage * 0.026;
  }

  const jitter = seededUnit(descriptor.seed + Math.round(candidate.centerX * 3 + candidate.centerY * 5), 41) * 0.02;

  return nearestGap - clampPenalty * 0.03 + positionBiasScore + ambientEdgeCoverage + targetEdgeScore + jitter;
}

function pilePlacementGap(candidate, descriptor, placed) {
  const dx = Math.abs(candidate.centerX - placed.centerX);
  const dy = Math.abs(candidate.centerY - placed.centerY);
  const gapX = dx - (descriptor.footprintWidth + placed.footprintWidth) / 2;
  const gapY = dy - (descriptor.footprintHeight + placed.footprintHeight) / 2;
  const scaleX = Math.max(48, (descriptor.footprintWidth + placed.footprintWidth) * 0.38);
  const scaleY = Math.max(40, (descriptor.footprintHeight + placed.footprintHeight) * 0.42);

  if (gapX < 0 && gapY < 0) {
    return -Math.hypot((-gapX) / scaleX, (-gapY) / scaleY);
  }

  return Math.hypot(Math.max(0, gapX) / scaleX, Math.max(0, gapY) / scaleY);
}

function runPoissonDiskSampling(width, height, radius, attemptsPerPoint, rng) {
  const cellSize = radius / Math.SQRT2;
  const gridWidth = Math.ceil(width / cellSize);
  const gridHeight = Math.ceil(height / cellSize);
  const grid = new Array(gridWidth * gridHeight).fill(null);
  const points = [];
  const active = [];

  const insertPoint = (point) => {
    points.push(point);
    active.push(point);
    const gx = Math.floor(point.x / cellSize);
    const gy = Math.floor(point.y / cellSize);
    grid[gy * gridWidth + gx] = point;
  };

  insertPoint({
    x: rng() * width,
    y: rng() * height
  });

  while (active.length) {
    const activeIndex = Math.floor(rng() * active.length);
    const origin = active[activeIndex];
    let placed = false;

    for (let attempt = 0; attempt < attemptsPerPoint; attempt += 1) {
      const angle = rng() * Math.PI * 2;
      const distance = radius * (1 + rng());
      const point = {
        x: origin.x + Math.cos(angle) * distance,
        y: origin.y + Math.sin(angle) * distance
      };

      if (point.x < 0 || point.x > width || point.y < 0 || point.y > height) {
        continue;
      }

      if (!poissonPointIsValid(point, grid, gridWidth, gridHeight, cellSize, radius)) {
        continue;
      }

      insertPoint(point);
      placed = true;
      break;
    }

    if (!placed) {
      active.splice(activeIndex, 1);
    }
  }

  return points;
}

function poissonPointIsValid(point, grid, gridWidth, gridHeight, cellSize, radius) {
  const gridX = Math.floor(point.x / cellSize);
  const gridY = Math.floor(point.y / cellSize);

  for (let y = Math.max(0, gridY - 2); y <= Math.min(gridHeight - 1, gridY + 2); y += 1) {
    for (let x = Math.max(0, gridX - 2); x <= Math.min(gridWidth - 1, gridX + 2); x += 1) {
      const neighbor = grid[y * gridWidth + x];
      if (!neighbor) {
        continue;
      }

      if (Math.hypot(point.x - neighbor.x, point.y - neighbor.y) < radius) {
        return false;
      }
    }
  }

  return true;
}

function topUpPoissonPoints(existingPoints, count, width, height, candidateCount, rng) {
  const points = [...existingPoints];

  while (points.length < count) {
    let bestPoint = null;
    let bestDistance = -Infinity;

    for (let attempt = 0; attempt < candidateCount; attempt += 1) {
      const candidate = {
        x: rng() * width,
        y: rng() * height
      };
      const nearest = points.length
        ? Math.min(...points.map((point) => Math.hypot(candidate.x - point.x, candidate.y - point.y)))
        : Infinity;

      if (nearest > bestDistance) {
        bestDistance = nearest;
        bestPoint = candidate;
      }
    }

    points.push(bestPoint);
  }

  return points;
}

function buildPileEdgeTargets(count, kind) {
  const targetCount = kind === "header"
    ? Math.min(4, Math.max(2, Math.round(count * 0.34)))
    : Math.min(3, Math.max(2, Math.round(count * 0.3)));
  const startLeft = seededUnit(hashString(`${kind}:edge-order:${count}:${pileLayoutSeed}`), 1) >= 0.5;
  const targets = [];

  for (let index = 0; index < targetCount; index += 1) {
    const pairIndex = Math.floor(index / 2);
    const side = ((index % 2 === 0) === startLeft) ? "left" : "right";
    const depth = pairIndex === 0 ? "outer" : "inner";
    targets.push(`${side}-${depth}`);
  }

  return targets;
}

function buildPileEdgeAnchorPoints(metrics, count, kind) {
  const anchorsPerSide = kind === "header" ? 5 : 4;
  const anchorSeed = hashString(`${kind}:edge-anchors:${metrics.width}:${count}:${pileLayoutSeed}`);
  const anchors = [];

  for (let sideIndex = 0; sideIndex < 2; sideIndex += 1) {
    const side = sideIndex === 0 ? "left" : "right";

    for (let index = 0; index < anchorsPerSide; index += 1) {
      const placementSeed = anchorSeed + sideIndex * 977 + index * 131;
      const yBase = (index + 0.5) / anchorsPerSide;
      const yJitter = lerp(-0.16, 0.16, seededUnit(placementSeed, 1));
      const xDepth = lerp(0.16, 0.78, seededUnit(placementSeed, 2));

      anchors.push({
        x: side === "left"
          ? metrics.bleedX * (1 - xDepth)
          : metrics.width + metrics.bleedX + metrics.bleedX * xDepth,
        y: metrics.bleedY + clamp(
          metrics.height * (yBase + yJitter),
          -metrics.bleedY * 0.2,
          metrics.height + metrics.bleedY * 0.2
        )
      });
    }
  }

  return anchors;
}

function intervalOverlapLength(startA, endA, startB, endB) {
  return Math.max(0, Math.min(endA, endB) - Math.max(startA, startB));
}

function chooseCoPrimeStep(length) {
  const candidates = [5, 7, 3, 11, 2, 13];
  const match = candidates.find((candidate) => gcd(candidate, length) === 1);
  return match ?? 1;
}

function gcd(left, right) {
  let a = Math.abs(left);
  let b = Math.abs(right);

  while (b) {
    const temp = b;
    b = a % b;
    a = temp;
  }

  return a || 1;
}

function buildMainGrid(chartWidth) {
  const firstTick = Math.floor(layout.startYear / 5) * 5;
  const lines = [];

  for (let year = firstTick; year <= Math.ceil(layout.endYear); year += 5) {
    const y = yearToY(year);
    const strong = year % 10 === 0;
    lines.push(`
      <line
        x1="0"
        y1="${y}"
        x2="${chartWidth - layout.rightRail}"
        y2="${y}"
        stroke="${strong ? cssVar("--grid-strong") : cssVar("--grid")}"
        stroke-width="${strong ? 1.4 : 1}"
        stroke-dasharray="${strong ? "0" : "5 10"}"
      ></line>
    `);
  }

  lines.push(`
    <line
      x1="0"
      y1="${yearToY(layout.startYear)}"
      x2="0"
      y2="${yearToY(layout.endYear)}"
      stroke="${cssVar("--grid-strong")}"
      stroke-width="1.6"
    ></line>
  `);

  return `<g>${lines.join("")}</g>`;
}

function buildRailGrid() {
  const firstTick = Math.floor(layout.startYear / 5) * 5;
  const lines = [];

  for (let year = firstTick; year <= Math.ceil(layout.endYear); year += 5) {
    const y = yearToY(year);
    const strong = year % 10 === 0;
    lines.push(`
      <text
        x="${layout.leftRail - 24}"
        y="${y + 4}"
        fill="${strong ? cssVar("--ink") : cssVar("--muted")}"
        font-family="${fontMono()}"
        font-size="${strong ? 13 : 12}"
        text-anchor="end"
      >${year}</text>
    `);
  }

  lines.push(`
    <line
      x1="${layout.leftRail - 18}"
      y1="${yearToY(layout.startYear)}"
      x2="${layout.leftRail - 18}"
      y2="${yearToY(layout.endYear)}"
      stroke="${cssVar("--grid-strong")}"
      stroke-width="1.6"
    ></line>
  `);

  return `<g>${lines.join("")}</g>`;
}

function buildMainEventLines(chartWidth) {
  return `
    <g id="mainEventLinesLayer">
      ${events.map((event) => {
        const y = eventYearToY(event.year);
        const color = cssVar("--event-ink");

        return `
          <line
            x1="0"
            y1="${y}"
            x2="${chartWidth - layout.rightRail}"
            y2="${y}"
            stroke="${color}"
            stroke-width="${event.width}"
            stroke-linecap="round"
            stroke-opacity="0.74"
          ></line>
        `;
      }).join("")}
    </g>
  `;
}

function buildMainEventLabels(chartWidth) {
  return `
    <g id="mainEventLabelsLayer">
      ${events.map((event) => {
        const y = eventYearToY(event.year);
        const color = cssVar("--event-ink");
        const labelLayout = layoutEventLabel(event.label, layout.maxEventWidth);
        const labelWidth = labelLayout.width;
        const labelHeight = labelLayout.height;
        const labelX = eventLabelX(event, labelWidth, chartWidth);
        const labelY = y - labelLayout.height / 2;
        const textX = 14;
        const textStartY = (labelLayout.height - labelLayout.contentHeight) / 2 + labelLayout.fontSize - 1;
        const expandedCard = layoutExpandedEventCard(event, labelLayout);
        const imageMarkup = buildEventImage(event, labelX, labelY);
        const shellStyle = [
          `--event-scale-x:${(labelWidth / expandedCard.width).toFixed(4)}`,
          `--event-scale-y:${(labelHeight / expandedCard.height).toFixed(4)}`
        ].join("; ");
        const cardMarkup = `
          <g
            class="event-card-shell"
            transform="translate(${labelX} ${labelY})"
            style="${shellStyle}"
          >
            <g class="event-card-backdrop">
              <rect
                x="0"
                y="0"
                width="${expandedCard.width}"
                height="${expandedCard.height}"
                rx="16"
                fill="${cssVar("--event-label-fill")}"
                stroke="${color}"
                stroke-width="1.25"
                filter="url(#soft)"
              ></rect>
            </g>
            <text
              class="event-card-title"
              x="${textX}"
              y="${textStartY}"
              fill="${color}"
              font-family="${fontMono()}"
              font-size="${labelLayout.fontSize}"
              letter-spacing="0.2"
              text-anchor="start"
            >${labelLayout.lines.map((line, lineIndex) => `
              <tspan x="${textX}" y="${textStartY + lineIndex * labelLayout.lineHeight}">${escapeText(line)}</tspan>
            `).join("")}</text>
            <g class="event-card-extra">
              <text
                x="${expandedCard.copyX}"
                y="${expandedCard.dateStartY}"
                fill="rgba(250, 247, 240, 0.72)"
                font-family="${fontMono()}"
                font-size="${expandedCard.dateFontSize}"
                letter-spacing="0.14"
                text-anchor="start"
              >${expandedCard.dateLines.map((line, lineIndex) => `
                <tspan x="${expandedCard.copyX}" y="${expandedCard.dateStartY + lineIndex * expandedCard.dateLineHeight}">${escapeText(line)}</tspan>
              `).join("")}</text>
              ${expandedCard.detailBlocks.map((block) => `
                <text
                  x="${expandedCard.copyX}"
                  y="${block.startY}"
                  fill="rgba(250, 247, 240, 0.88)"
                  font-family="${fontMono()}"
                  font-size="${expandedCard.detailFontSize}"
                  letter-spacing="0.1"
                  text-anchor="start"
                >${block.lines.map((line, lineIndex) => `
                  <tspan x="${expandedCard.copyX}" y="${block.startY + lineIndex * expandedCard.detailLineHeight}">${escapeText(line)}</tspan>
                `).join("")}</text>
              `).join("")}
            </g>
          </g>
        `;

        if (event.link) {
          return `
            <g class="event-node">
              ${imageMarkup}
              <a
                href="${escapeAttr(event.link)}"
                target="_blank"
                class="event-label-link"
                aria-label="Open ${escapeAttr(event.label)} on Wikipedia"
              >
                ${cardMarkup}
              </a>
            </g>
          `;
        }

        return `
          <g class="event-node">
            ${imageMarkup}
            <g class="event-label-link">
              ${cardMarkup}
            </g>
          </g>
        `;
      }).join("")}
    </g>
  `;
}

function buildPeople(filtered, columnMetrics) {
  return `
    <g>
      ${filtered.map((person, index) => {
        const metric = columnMetrics[index];
        const state = computeTimelinePersonState(person, metric);
        const deathMarkerMarkup = buildDeathMarker(person, state);
        const annotationMarkup = buildTimelineAnnotations(person, state);

        return `
          <g
            data-person-group="${index}"
            opacity="${state.groupOpacity}"
          >
            <line
              data-role="hover-line"
              data-person="true"
              data-name="${escapeAttr(person.name)}"
              x1="${state.x}"
              y1="${state.y1}"
              x2="${state.x}"
              y2="${state.deathMarkerTopY}"
              stroke="rgba(0, 0, 0, 0.001)"
              stroke-width="${state.hoverWidth}"
              stroke-linecap="round"
              pointer-events="stroke"
            ></line>
            <line
              data-role="halo-line"
              x1="${state.x}"
              y1="${state.y1}"
              x2="${state.x}"
              y2="${state.deathMarkerTopY}"
              stroke="${state.haloColor}"
              stroke-width="${state.haloWidth}"
              stroke-linecap="round"
              pointer-events="none"
            ></line>
            <line
              data-role="core-line"
              x1="${state.x}"
              y1="${state.y1}"
              x2="${state.x}"
              y2="${state.deathMarkerTopY}"
              stroke="${state.lineColor}"
              stroke-width="${state.lineWidth}"
              stroke-linecap="round"
              pointer-events="none"
            ></line>
            ${annotationMarkup}
            <circle
              data-role="birth-dot"
              cx="${state.x}"
              cy="${state.y1}"
              r="${state.birthRadius}"
              fill="${state.birthColor}"
              pointer-events="none"
            ></circle>
            ${deathMarkerMarkup}
            ${state.birthLabelLines.length ? `
              <text
                data-role="birth-label"
                x="${state.x}"
                y="${state.birthLabelStartY}"
                fill="${cssVar("--ink-strong")}"
                font-family="${fontMono()}"
                font-size="${state.birthLabelFontSize}"
                text-anchor="middle"
                letter-spacing="0.12"
                opacity="${state.birthLabelOpacity}"
                pointer-events="none"
                stroke="${cssVar("--paper")}"
                stroke-width="2.6"
                paint-order="stroke"
              >${state.birthLabelLines.map((line, lineIndex) => `
                <tspan x="${state.x}" y="${state.birthLabelStartY + lineIndex * state.birthLabelLineHeight}">${escapeText(line)}</tspan>
              `).join("")}</text>
            ` : ""}
            <line
              data-role="birth-guide"
              x1="${state.x}"
              y1="0"
              x2="${state.x}"
              y2="${state.y1 - 10}"
              stroke="${state.lineColor}"
              stroke-width="1.4"
              stroke-dasharray="4 6"
              opacity="${state.guideOpacity}"
              pointer-events="none"
            ></line>
          </g>
        `;
      }).join("")}
    </g>
  `;
}

function buildAxisLabel() {
  return `
    <g>
      <text
        x="${layout.leftRail - 28}"
        y="24"
        fill="${cssVar("--muted")}"
        font-family="${fontMono()}"
        font-size="12"
        text-anchor="end"
        letter-spacing="1.6"
      >YEAR</text>
    </g>
  `;
}

function computeTimelinePersonState(person, metric) {
  const collapsed = metric.collapseT;
  const x = metric.center;
  const y1 = yearToY(person.born);
  const y2 = yearToY(Math.min(person.died, layout.endYear));
  const lineColor = "rgba(250, 247, 240, 0.46)";
  const haloColor = "rgba(250, 247, 240, 0.12)";
  const birthColor = "rgba(250, 247, 240, 0.9)";
  const lineWidth = lerp(3.2, 1.1, collapsed);
  const haloWidth = lerp(7.2, 2.4, collapsed);
  const birthRadius = lerp(5.4, 2.7, collapsed);
  const deathMarkerSize = lerp(14.5, 7.4, collapsed);
  const deathMarkerTopY = y2 - deathMarkerSize * 0.58;
  const groupOpacity = lerp(1, 0.38, collapsed);
  const guideOpacity = lerp(0.42, 0.2, collapsed);
  const birthLabelLines = person.placeOfBirth
    ? stackLabelWords(person.placeOfBirth, 4)
    : [];
  const birthLabelOpacity = birthLabelLines.length
    ? clamp((metric.width - 24) / 24, 0, 1) * lerp(0.82, 0.28, collapsed)
    : 0;
  const birthLabelFontSize = layout.columnWidth < 68 ? 10.4 : 11.2;
  const birthLabelLineHeight = birthLabelFontSize + 2.4;
  const birthLabelBottomY = y1 - birthRadius - 10;
  const birthLabelStartY = Math.max(14, birthLabelBottomY - (birthLabelLines.length - 1) * birthLabelLineHeight);
  const hoverWidth = Math.max(12, haloWidth + 5.5);

  return {
    collapsed,
    x,
    y1,
    y2,
    lineColor,
    haloColor,
    birthColor,
    lineWidth,
    haloWidth,
    birthRadius,
    deathMarkerSize,
    deathMarkerTopY,
    groupOpacity,
    guideOpacity,
    birthLabelLines,
    birthLabelOpacity,
    birthLabelFontSize,
    birthLabelLineHeight,
    birthLabelStartY,
    hoverWidth
  };
}

function computeStripPersonState(person, metric) {
  const collapsed = metric.collapseT;
  const nameLines = wrapName(person.name, layout.columnWidth < 68 ? 12 : 14, 4);
  const slotWidth = metric.width;
  const portraitSize = Math.max(10, Math.min(34, Math.round(Math.min(slotWidth - 2, lerp(34, 12, collapsed)))));
  const nameOpacity = clamp((slotWidth - 26) / 20, 0, 1);
  const paddingX = slotWidth > 28 ? 4 : 0;
  const paddingTop = nameOpacity > 0.08 ? 8 : 10;
  const paddingBottom = nameOpacity > 0.08 ? 10 : 6;
  const cardOpacity = lerp(1, 0.72, collapsed);
  const portraitMarginBottom = nameOpacity > 0.08 ? 10 : 0;

  return {
    nameLines,
    slotWidth,
    portraitSize,
    nameOpacity,
    paddingX,
    paddingTop,
    paddingBottom,
    cardOpacity,
    portraitMarginBottom
  };
}

function buildDeathMarker(person, state) {
  return `
    <g
      data-role="death-marker"
      transform="${deathMarkerTransform(state.x, state.y2, state.deathMarkerSize)}"
      pointer-events="none"
    >
      ${person.fate === "purged" ? buildSkullShape() : buildTombstoneShape()}
    </g>
  `;
}

function deathMarkerTransform(x, y, size) {
  return `translate(${x} ${y}) scale(${size / 14})`;
}

function buildTimelineAnnotations(person, state) {
  if (!person.timelineAnnotations.length) {
    return "";
  }

  const baseWidth = lerp(6.2, 3.2, state.collapsed);
  const hoverWidth = baseWidth + 6;

  return person.timelineAnnotations.map((annotation, index) => {
    const y1 = yearToY(annotation.start);
    const y2 = yearToY(annotation.end);

    return `
      <g data-annotation-group="${index}">
        <line
          data-role="annotation-halo"
          x1="${state.x}"
          y1="${y1}"
          x2="${state.x}"
          y2="${y2}"
          stroke="${annotation.halo}"
          stroke-width="${baseWidth + 3.6}"
          stroke-linecap="round"
          pointer-events="none"
        ></line>
        <line
          data-role="annotation-core"
          x1="${state.x}"
          y1="${y1}"
          x2="${state.x}"
          y2="${y2}"
          stroke="${annotation.color}"
          stroke-width="${baseWidth}"
          stroke-linecap="round"
          pointer-events="none"
        ></line>
        <line
          data-role="annotation-hover"
          data-timeline-annotation="true"
          data-name="${escapeAttr(person.name)}"
          data-annotation-index="${index}"
          x1="${state.x}"
          y1="${y1}"
          x2="${state.x}"
          y2="${y2}"
          stroke="rgba(0, 0, 0, 0.001)"
          stroke-width="${hoverWidth}"
          stroke-linecap="round"
          pointer-events="stroke"
        ></line>
      </g>
    `;
  }).join("");
}

function buildTombstoneShape() {
  return `
    <path
      d="M -5.2 6.6 L -5.2 -0.9 C -5.2 -4.8 -2.8 -7.4 0 -7.4 C 2.8 -7.4 5.2 -4.8 5.2 -0.9 L 5.2 6.6 Z"
      fill="rgba(250, 247, 240, 0.94)"
      stroke="rgba(35, 8, 10, 0.92)"
      stroke-width="0.9"
      stroke-linejoin="round"
    ></path>
    <rect
      x="-6.6"
      y="6.1"
      width="13.2"
      height="2.1"
      rx="1"
      fill="rgba(35, 8, 10, 0.88)"
      opacity="0.78"
    ></rect>
    <line
      x1="0"
      y1="-4.1"
      x2="0"
      y2="2.1"
      stroke="rgba(35, 8, 10, 0.9)"
      stroke-width="0.9"
      stroke-linecap="round"
    ></line>
    <line
      x1="-2.2"
      y1="-1.4"
      x2="2.2"
      y2="-1.4"
      stroke="rgba(35, 8, 10, 0.9)"
      stroke-width="0.9"
      stroke-linecap="round"
    ></line>
  `;
}

function buildSkullShape() {
  return `
    <path
      d="M 0 -7.2 C -4.4 -7.2 -7.1 -4.3 -7.1 -0.2 C -7.1 2.8 -5.6 5 -3.7 6 L -3.7 8 L 3.7 8 L 3.7 6 C 5.6 5 7.1 2.8 7.1 -0.2 C 7.1 -4.3 4.4 -7.2 0 -7.2 Z"
      fill="#d7261e"
      stroke="rgba(35, 8, 10, 0.96)"
      stroke-width="0.9"
      stroke-linejoin="round"
    ></path>
    <circle cx="-2.2" cy="-1.1" r="1.25" fill="#090405"></circle>
    <circle cx="2.2" cy="-1.1" r="1.25" fill="#090405"></circle>
    <path d="M 0 0.7 L -1.2 2.4 L 1.2 2.4 Z" fill="#090405"></path>
    <rect x="-2.8" y="4.2" width="5.6" height="2.2" rx="0.8" fill="#090405"></rect>
    <line x1="-0.9" y1="4.3" x2="-0.9" y2="6.1" stroke="#d7261e" stroke-width="0.7"></line>
    <line x1="0" y1="4.3" x2="0" y2="6.1" stroke="#d7261e" stroke-width="0.7"></line>
    <line x1="0.9" y1="4.3" x2="0.9" y2="6.1" stroke="#d7261e" stroke-width="0.7"></line>
  `;
}

function renderPeopleStrip(filtered, chartWidth, columnMetrics) {
  peopleStrip.style.width = `${chartWidth}px`;
  const spacerWidth = layout.leftRail;

  peopleStrip.innerHTML = [
    `
      <div class="people-strip-rail" style="width:${spacerWidth}px"></div>
    `,
    ...filtered.map((person, index) => {
      const state = computeStripPersonState(person, columnMetrics[index]);
      const portraitClass = person.photoPath ? "people-card-portrait has-photo" : "people-card-portrait";
      const portraitStyle = [
        `width:${state.portraitSize}px`,
        `height:${state.portraitSize}px`,
        `margin:0 auto ${state.portraitMarginBottom}px`,
        `color:${cssVar("--ink")}`,
        "background-color:rgba(250, 247, 240, 0.12)"
      ];

      if (person.photoPath) {
        portraitStyle.push(`background-image:url('${escapeCssUrl(person.photoPath)}')`);
        portraitStyle.push("background-position:center center");
        portraitStyle.push("background-repeat:no-repeat");
        portraitStyle.push("background-size:cover");
      }

      const portraitMarkup = `
        <a
          class="people-card-portrait-link"
          href="${escapeAttr(person.wikipediaUrl)}"
          target="_blank"
          rel="noreferrer"
          aria-label="Open ${escapeAttr(person.name)} on Wikipedia"
        >
          <div
            class="${portraitClass}"
            style="${portraitStyle.join("; ")}"
          ></div>
        </a>
      `;

      return `
        <div class="people-card-slot" data-person-slot="${index}" style="width:${state.slotWidth}px">
          <div
            class="people-card"
            data-role="people-card"
            data-person="true"
            data-name="${escapeAttr(person.name)}"
            style="width:${state.slotWidth}px; padding:${state.paddingTop}px ${state.paddingX}px ${state.paddingBottom}px; opacity:${state.cardOpacity};"
          >
            ${portraitMarkup}
            <p class="people-card-name" data-role="name" style="opacity:${state.nameOpacity};">${state.nameLines.map((line) => escapeText(line)).join("<br>")}</p>
          </div>
        </div>
      `;
    }),
    `<div class="people-strip-spacer" style="width:${layout.rightRail}px"></div>`
  ].join("");
}

function handleWindowScroll() {
  hideTooltip();
  scheduleScrollDrivenLayout();
}

function scheduleScrollDrivenLayout() {
  if (scrollLayoutFrame) {
    return;
  }

  scrollLayoutFrame = window.requestAnimationFrame(() => {
    scrollLayoutFrame = 0;
    updateScrollDrivenLayout();
  });
}

function handlePeopleStripScroll() {
  syncHorizontalScroll(peopleStripScroller, timelineScroll);
  scheduleScrollDrivenLayout();
}

function handleTimelineScroll() {
  syncHorizontalScroll(timelineScroll, peopleStripScroller);
  scheduleScrollDrivenLayout();
}

function syncHorizontalScroll(source, target) {
  if (!source || !target || syncingHorizontalScroll) {
    return;
  }

  if (Math.abs(target.scrollLeft - source.scrollLeft) < 1) {
    return;
  }

  syncingHorizontalScroll = true;
  target.scrollLeft = source.scrollLeft;
  window.requestAnimationFrame(() => {
    syncingHorizontalScroll = false;
  });
}

function updateScrollDrivenLayout(force = false) {
  if (!timelineStage || !timelinePeopleLayer || people.length === 0 || !timelinePersonNodes.length || !peopleStripNodes.length) {
    return;
  }

  const focusYear = quantize(currentFocusYear(), 0.05);
  const currentScrollLeft = currentHorizontalScrollLeft();
  const columnMetrics = computeColumnMetrics(people, focusYear, currentScrollLeft);
  const signature = [
    focusYear.toFixed(2),
    String(currentScrollLeft),
    ...columnMetrics.map((metric) => metric.width.toFixed(2))
  ].join("|");

  if (!force && signature === lastDynamicSignature) {
    return;
  }

  lastDynamicSignature = signature;
  updatePinnedEventLayout(currentScrollLeft);
  updatePeopleStripLayout(columnMetrics);
  updateTimelinePeopleLayout(columnMetrics);

  if (timelineScroll) {
    timelineScroll.scrollLeft = currentScrollLeft;
  }
  if (peopleStripScroller) {
    peopleStripScroller.scrollLeft = currentScrollLeft;
  }
}

function updatePinnedEventLayout(scrollLeft) {
  const translate = `translate(${scrollLeft} 0)`;

  if (timelineEventLinesLayer) {
    timelineEventLinesLayer.setAttribute("transform", translate);
  }

  if (timelineEventLabelsLayer) {
    timelineEventLabelsLayer.setAttribute("transform", translate);
  }
}

function currentHorizontalScrollLeft() {
  if (peopleStripScroller) {
    return Math.round(peopleStripScroller.scrollLeft);
  }

  return Math.round(timelineScroll?.scrollLeft ?? 0);
}

function currentFocusYear() {
  const stageRect = timelineStage.getBoundingClientRect();
  const timelineTop = stageRect.top + window.scrollY;
  const stickyHeight = peopleStripWrap ? peopleStripWrap.offsetHeight : 0;
  const viewportFocusY = window.scrollY + stickyHeight + Math.max(0, (window.innerHeight - stickyHeight) * 0.45);
  const chartFocusY = viewportFocusY - timelineTop;
  return clamp(chartYToYear(chartFocusY), layout.startYear, layout.endYear);
}

function computeColumnMetrics(filtered, focusYear, currentScrollLeft = 0) {
  let cursor = 0;
  const collapsedWidth = Math.max(collapseLayout.minWidth, Math.round(layout.columnWidth * 0.18));
  const fullWidth = layout.columnWidth;
  const visibleMainWidth = currentVisibleMainWidth();
  const viewportRight = currentScrollLeft + visibleMainWidth;
  const expandedTotalWidth = filtered.length * fullWidth;
  const requiredShrink = Math.max(0, expandedTotalWidth - viewportRight);

  const naturalMetrics = filtered.map((person) => {
    const naturalCollapseT = smoothstep(collapseProgress(person, focusYear));
    const naturalWidth = lerp(fullWidth, collapsedWidth, naturalCollapseT);
    const naturalShrink = fullWidth - naturalWidth;

    return {
      person,
      naturalCollapseT,
      naturalShrink
    };
  });

  let remainingShrink = requiredShrink;

  return naturalMetrics.map((metric) => {
    const appliedShrink = Math.min(metric.naturalShrink, Math.max(0, remainingShrink));
    remainingShrink -= appliedShrink;
    const width = fullWidth - appliedShrink;
    const collapseRange = fullWidth - collapsedWidth;
    const collapseT = collapseRange > 0
      ? clamp(appliedShrink / collapseRange, 0, 1)
      : 0;
    const start = cursor;
    const center = start + width / 2;
    cursor += width;

    return {
      person: metric.person,
      collapseT,
      width,
      start,
      center,
      end: cursor
    };
  });
}

function currentVisibleMainWidth() {
  const viewportWidth = timelineScroll?.clientWidth || window.innerWidth || stageWidth || mainChartWidth;
  return Math.max(0, viewportWidth - layout.leftRail);
}

function collapseProgress(person, focusYear) {
  if (focusYear <= person.died) {
    return 0;
  }

  return clamp((focusYear - person.died) / collapseLayout.transitionYears, 0, 1);
}

function yearToY(year) {
  return layout.topBand + (year - layout.startYear) * layout.yearHeight;
}

function eventYearToY(year) {
  return Math.round(yearToY(year));
}

function chartYToYear(chartY) {
  return layout.startYear + (chartY - layout.topBand) / layout.yearHeight;
}

function cacheDynamicNodes() {
  timelinePersonNodes = people.map((person, index) => {
    const group = timelinePeopleLayer?.querySelector(`[data-person-group="${index}"]`);
    const birthLabel = group?.querySelector('[data-role="birth-label"]');

    return {
      group,
      hoverLine: group?.querySelector('[data-role="hover-line"]'),
      haloLine: group?.querySelector('[data-role="halo-line"]'),
      coreLine: group?.querySelector('[data-role="core-line"]'),
      birthDot: group?.querySelector('[data-role="birth-dot"]'),
      deathMarker: group?.querySelector('[data-role="death-marker"]'),
      birthLabel,
      birthLabelTspans: birthLabel ? Array.from(birthLabel.querySelectorAll("tspan")) : [],
      guideLine: group?.querySelector('[data-role="birth-guide"]'),
      annotationNodes: person.timelineAnnotations.map((annotation, annotationIndex) => {
        const annotationGroup = group?.querySelector(`[data-annotation-group="${annotationIndex}"]`);

        return {
          annotation,
          haloLine: annotationGroup?.querySelector('[data-role="annotation-halo"]'),
          coreLine: annotationGroup?.querySelector('[data-role="annotation-core"]'),
          hoverLine: annotationGroup?.querySelector('[data-role="annotation-hover"]')
        };
      })
    };
  });

  peopleStripNodes = people.map((person, index) => {
    const slot = peopleStrip?.querySelector(`[data-person-slot="${index}"]`);
    const card = slot?.querySelector('[data-role="people-card"]');

    return {
      slot,
      card,
      portrait: card?.querySelector('.people-card-portrait'),
      name: card?.querySelector('[data-role="name"]')
    };
  });
}

function bindDynamicInteractions() {
  timelinePersonNodes.forEach((nodes) => {
    bindTooltipHandlers(nodes.hoverLine, showPersonTooltip);
    nodes.annotationNodes.forEach((annotationNodes) => {
      bindTooltipHandlers(annotationNodes.hoverLine, showTimelineAnnotationTooltip);
    });
  });

  peopleStripNodes.forEach((nodes) => {
    bindTooltipHandlers(nodes.card, showPersonTooltip);
  });
}

function bindTooltipHandlers(node, enterHandler) {
  if (!node) {
    return;
  }

  node.addEventListener("pointerenter", enterHandler);
  node.addEventListener("pointermove", moveTooltip);
  node.addEventListener("pointerleave", hideTooltip);
}

function updatePeopleStripLayout(columnMetrics) {
  people.forEach((person, index) => {
    const nodes = peopleStripNodes[index];

    if (!nodes?.slot || !nodes.card || !nodes.portrait) {
      return;
    }

    const state = computeStripPersonState(person, columnMetrics[index]);
    nodes.slot.style.width = `${state.slotWidth}px`;
    nodes.card.style.width = `${state.slotWidth}px`;
    nodes.card.style.padding = `${state.paddingTop}px ${state.paddingX}px ${state.paddingBottom}px`;
    nodes.card.style.opacity = `${state.cardOpacity}`;
    nodes.portrait.style.width = `${state.portraitSize}px`;
    nodes.portrait.style.height = `${state.portraitSize}px`;
    nodes.portrait.style.margin = `0 auto ${state.portraitMarginBottom}px`;

    if (nodes.name) {
      nodes.name.style.opacity = `${state.nameOpacity}`;
    }
  });
}

function updateTimelinePeopleLayout(columnMetrics) {
  people.forEach((person, index) => {
    const nodes = timelinePersonNodes[index];

    if (!nodes?.group || !nodes.hoverLine || !nodes.haloLine || !nodes.coreLine || !nodes.birthDot || !nodes.deathMarker || !nodes.guideLine) {
      return;
    }

    const state = computeTimelinePersonState(person, columnMetrics[index]);
    const annotationBaseWidth = lerp(6.2, 3.2, columnMetrics[index].collapseT);
    const annotationHoverWidth = annotationBaseWidth + 6;

    nodes.group.setAttribute("opacity", `${state.groupOpacity}`);
    setLineGeometry(nodes.hoverLine, state.x, state.y1, state.x, state.deathMarkerTopY, state.hoverWidth);
    setLineGeometry(nodes.haloLine, state.x, state.y1, state.x, state.deathMarkerTopY, state.haloWidth);
    setLineGeometry(nodes.coreLine, state.x, state.y1, state.x, state.deathMarkerTopY, state.lineWidth);
    nodes.birthDot.setAttribute("cx", `${state.x}`);
    nodes.birthDot.setAttribute("cy", `${state.y1}`);
    nodes.birthDot.setAttribute("r", `${state.birthRadius}`);
    nodes.deathMarker.setAttribute("transform", deathMarkerTransform(state.x, state.y2, state.deathMarkerSize));

    if (nodes.birthLabel) {
      nodes.birthLabel.setAttribute("x", `${state.x}`);
      nodes.birthLabel.setAttribute("y", `${state.birthLabelStartY}`);
      nodes.birthLabel.setAttribute("opacity", `${state.birthLabelOpacity}`);
      nodes.birthLabelTspans.forEach((tspan, lineIndex) => {
        tspan.setAttribute("x", `${state.x}`);
        tspan.setAttribute("y", `${state.birthLabelStartY + lineIndex * state.birthLabelLineHeight}`);
      });
    }

    nodes.guideLine.setAttribute("x1", `${state.x}`);
    nodes.guideLine.setAttribute("x2", `${state.x}`);
    nodes.guideLine.setAttribute("y2", `${state.y1 - 10}`);
    nodes.guideLine.setAttribute("opacity", `${state.guideOpacity}`);

    nodes.annotationNodes.forEach((annotationNodes) => {
      if (!annotationNodes.haloLine || !annotationNodes.coreLine || !annotationNodes.hoverLine) {
        return;
      }

      const y1 = yearToY(annotationNodes.annotation.start);
      const y2 = yearToY(annotationNodes.annotation.end);
      setLineGeometry(annotationNodes.haloLine, state.x, y1, state.x, y2, annotationBaseWidth + 3.6);
      setLineGeometry(annotationNodes.coreLine, state.x, y1, state.x, y2, annotationBaseWidth);
      setLineGeometry(annotationNodes.hoverLine, state.x, y1, state.x, y2, annotationHoverWidth);
    });
  });
}

function setLineGeometry(node, x1, y1, x2, y2, strokeWidth) {
  node.setAttribute("x1", `${x1}`);
  node.setAttribute("y1", `${y1}`);
  node.setAttribute("x2", `${x2}`);
  node.setAttribute("y2", `${y2}`);
  node.setAttribute("stroke-width", `${strokeWidth}`);
}

function eventLabelX(event, labelWidth, chartWidth) {
  const minX = layout.eventInset;
  const maxChartX = Math.max(minX, chartWidth - layout.rightRail - labelWidth - layout.eventInset);
  const visibleMainWidth = Math.max(
    0,
    (timelineScroll?.clientWidth || window.innerWidth || chartWidth) - layout.leftRail
  );
  const maxViewportX = Math.max(minX, visibleMainWidth - labelWidth - layout.eventInset);
  const laneRatio = eventLaneRatio(event.lane);
  const baseX = lerp(minX, Math.min(maxChartX, maxViewportX), laneRatio);

  return clamp(baseX + event.xOffset, minX, maxChartX);
}

function eventLaneRatio(lane) {
  const minLane = layout.eventLaneMin;
  const maxLane = layout.eventLaneMax;
  const clampedLane = clamp(Number(lane), minLane, maxLane);
  const span = maxLane - minLane;

  if (!Number.isFinite(clampedLane) || span <= 0) {
    return 0.5;
  }

  return (clampedLane - minLane) / span;
}

function wrapName(name, maxChars, maxLines) {
  const prepared = [];

  for (const token of name.split(" ")) {
    if (token.includes("-")) {
      const parts = token.split("-");
      parts.forEach((part, index) => {
        prepared.push(index < parts.length - 1 ? `${part}-` : part);
      });
    } else {
      prepared.push(token);
    }
  }

  const lines = [];
  let current = "";

  for (const token of prepared) {
    const next = current ? `${current} ${token}` : token;
    if (next.length <= maxChars || !current) {
      current = next;
    } else {
      lines.push(current);
      current = token;
    }
  }

  if (current) {
    lines.push(current);
  }

  if (lines.length <= maxLines) {
    return lines;
  }

  const visible = lines.slice(0, maxLines - 1);
  visible.push(lines.slice(maxLines - 1).join(" "));
  return visible;
}

function stackLabelWords(text, maxLines) {
  const words = String(text)
    .replaceAll(/,\s*/g, ", ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length <= maxLines) {
    return words;
  }

  const visible = words.slice(0, maxLines);
  visible[maxLines - 1] = `${visible[maxLines - 1]}…`;
  return visible;
}

function layoutEventLabel(label, maxWidth) {
  const attempts = [11, 10.5, 10, 9.5];

  for (const fontSize of attempts) {
    const singleLineWidth = measureTextWidth(label, fontSize);
    const singleLineBoxWidth = Math.max(96, Math.ceil(singleLineWidth + 24));

    if (singleLineBoxWidth <= maxWidth) {
      return {
        lines: [label],
        width: singleLineBoxWidth,
        height: 24,
        fontSize,
        lineHeight: fontSize + 2,
        contentHeight: fontSize
      };
    }

    const wrapped = wrapEventLabel(label, maxWidth - 24, fontSize);
    if (wrapped) {
      const contentHeight = wrapped.lines.length * fontSize + (wrapped.lines.length - 1) * 2;
      return {
        lines: wrapped.lines,
        width: Math.max(96, Math.ceil(wrapped.longestLine + 24)),
        height: 18 + Math.ceil(contentHeight),
        fontSize,
        lineHeight: fontSize + 2,
        contentHeight
      };
    }
  }

  const fallbackFontSize = 9.5;
  const fallbackLines = forceWrapEventLabel(label, maxWidth - 24, fallbackFontSize);
  const longestLine = Math.max(...fallbackLines.map((line) => measureTextWidth(line, fallbackFontSize)));
  const contentHeight = fallbackLines.length * fallbackFontSize + (fallbackLines.length - 1) * 2;

  return {
    lines: fallbackLines,
    width: Math.max(96, Math.min(maxWidth, Math.ceil(longestLine + 24))),
    height: 18 + Math.ceil(contentHeight),
    fontSize: fallbackFontSize,
    lineHeight: fallbackFontSize + 2,
    contentHeight
  };
}

function wrapEventLabel(label, maxTextWidth, fontSize) {
  const words = label.split(" ");
  let best = null;

  for (let index = 1; index < words.length; index += 1) {
    const first = words.slice(0, index).join(" ");
    const second = words.slice(index).join(" ");
    const firstWidth = measureTextWidth(first, fontSize);
    const secondWidth = measureTextWidth(second, fontSize);
    const longestLine = Math.max(firstWidth, secondWidth);

    if (longestLine <= maxTextWidth) {
      if (!best || longestLine < best.longestLine) {
        best = {
          lines: [first, second],
          longestLine
        };
      }
    }
  }

  return best;
}

function forceWrapEventLabel(label, maxTextWidth, fontSize) {
  const words = label.split(" ");
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (!current || measureTextWidth(next, fontSize) <= maxTextWidth) {
      current = next;
    } else {
      lines.push(current);
      current = word;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function wrapTextBlock(text, maxTextWidth, fontSize, maxLines = Infinity) {
  const words = String(text ?? "").trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return [];
  }

  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (!current || measureTextWidth(next, fontSize) <= maxTextWidth) {
      current = next;
    } else {
      lines.push(current);
      current = word;
    }
  }

  if (current) {
    lines.push(current);
  }

  if (!Number.isFinite(maxLines) || lines.length <= maxLines) {
    return lines;
  }

  const visible = lines.slice(0, maxLines);
  visible[maxLines - 1] = fitLineWithEllipsis(visible[maxLines - 1], maxTextWidth, fontSize);
  return visible;
}

function fitLineWithEllipsis(text, maxTextWidth, fontSize) {
  let value = String(text ?? "").trim();

  if (!value) {
    return "…";
  }

  while (value && measureTextWidth(`${value}…`, fontSize) > maxTextWidth) {
    value = value.slice(0, -1).trimEnd();
  }

  return value ? `${value}…` : "…";
}

function hashString(value) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function createSeededRng(seed) {
  let state = (seed >>> 0) || 1;

  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function seededUnit(seed, salt = 0) {
  const value = Math.sin((seed + salt * 101.17) * 0.0001) * 10000;
  return value - Math.floor(value);
}

function wrapTextParagraphs(text, maxTextWidth, fontSize, maxLinesPerParagraph = Infinity, maxParagraphs = Infinity) {
  const paragraphs = String(text ?? "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  const visible = paragraphs
    .slice(0, Number.isFinite(maxParagraphs) ? maxParagraphs : paragraphs.length)
    .map((paragraph) => wrapTextBlock(paragraph, maxTextWidth, fontSize, maxLinesPerParagraph));

  if (Number.isFinite(maxParagraphs) && paragraphs.length > maxParagraphs && visible.length) {
    const lastLines = visible[visible.length - 1];
    lastLines[lastLines.length - 1] = fitLineWithEllipsis(
      lastLines[lastLines.length - 1],
      maxTextWidth,
      fontSize
    );
  }

  return visible;
}

function layoutExpandedEventCard(event, compactLayout) {
  const width = clamp(Math.max(compactLayout.width + 64, 200), 200, layout.eventCardWidth);
  const paddingX = 14;
  const paddingTop = 0;
  const paddingBottom = 14;
  const innerWidth = width - paddingX * 2;
  const dateFontSize = 10.5;
  const dateLineHeight = dateFontSize + 2.6;
  const detailFontSize = 11;
  const detailLineHeight = detailFontSize + 3.6;
  const dateLines = wrapTextBlock(event.date, innerWidth, dateFontSize);
  const detailParagraphs = event.details
    ? wrapTextParagraphs(event.details, innerWidth, detailFontSize)
    : [];
  const dateHeight = dateLines.length
    ? dateFontSize + (dateLines.length - 1) * dateLineHeight
    : 0;
  const detailGap = detailParagraphs.length ? 11 : 0;
  const paragraphGap = 11;
  const copyX = paddingX;
  const dateStartY = compactLayout.height + 17 + dateFontSize;
  let detailCursorY = dateStartY + dateHeight + detailGap;
  const detailBlocks = detailParagraphs.map((lines, index) => {
    const startY = detailCursorY;
    const blockHeight = detailFontSize + (lines.length - 1) * detailLineHeight;
    detailCursorY += blockHeight + (index < detailParagraphs.length - 1 ? paragraphGap : 0);
    return { lines, startY };
  });
  const height = Math.ceil(
    compactLayout.height
      + 16
      + dateHeight
      + detailGap
      + (detailBlocks.length ? detailCursorY - (dateStartY + dateHeight + detailGap) : 0)
      + paddingBottom
  );

  return {
    width,
    height,
    copyX,
    dateLines,
    dateFontSize,
    dateLineHeight,
    dateStartY,
    detailBlocks,
    detailFontSize,
    detailLineHeight
  };
}

function measureTextWidth(text, fontSize) {
  textMeasureContext.font = `${fontSize}px ${fontMono()}`;
  return textMeasureContext.measureText(text).width;
}

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

function quantize(value, step) {
  if (!Number.isFinite(value) || !Number.isFinite(step) || step <= 0) {
    return value;
  }

  return Math.round(value / step) * step;
}

function smoothstep(amount) {
  const clamped = clamp(amount, 0, 1);
  return clamped * clamped * (3 - 2 * clamped);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function normalizeLink(value) {
  const link = String(value ?? "").trim();
  if (!link) {
    return "";
  }
  return /^https?:\/\//i.test(link) ? link : "";
}

function normalizeEventImage(value) {
  if (!value || typeof value !== "object") {
    return {
      imagePath: "",
      xPosition: 0,
      yPosition: 0,
      angle: 0,
      scale: 1
    };
  }

  const xPosition = Number(value.x_position ?? value.xPosition ?? 0);
  const yPosition = Number(value.y_position ?? value.yPosition ?? 0);
  const angle = Number(value.angle ?? 0);
  const scale = Number(value.scale ?? 1);

  return {
    imagePath: String(value.image_path ?? value.imagePath ?? "").trim(),
    xPosition: Number.isFinite(xPosition) ? xPosition : 0,
    yPosition: Number.isFinite(yPosition) ? yPosition : 0,
    angle: Number.isFinite(angle) ? angle : 0,
    scale: Number.isFinite(scale) && scale > 0 ? scale : 1
  };
}

function showPersonTooltip(event) {
  const name = String(event.currentTarget.dataset.name ?? "").trim();
  const person = people.find((entry) => entry.name === name);

  if (!person) {
    return;
  }

  tooltip.innerHTML = buildPersonTooltip(person);
  tooltip.classList.add("is-visible");
  moveTooltip(event);
}

function showTimelineAnnotationTooltip(event) {
  const name = String(event.currentTarget.dataset.name ?? "").trim();
  const index = Number(event.currentTarget.dataset.annotationIndex);
  const person = people.find((entry) => entry.name === name);
  const annotation = person?.timelineAnnotations?.[index];

  if (!person || !annotation) {
    return;
  }

  tooltip.innerHTML = buildTimelineAnnotationTooltip(person, annotation);
  tooltip.classList.add("is-visible");
  moveTooltip(event);
}

function moveTooltip(event) {
  const padding = 18;
  const x = Math.min(window.innerWidth - tooltip.offsetWidth - padding, event.clientX + 18);
  const y = Math.max(padding, event.clientY - tooltip.offsetHeight - 14);
  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${y}px`;
}

function hideTooltip() {
  tooltip.classList.remove("is-visible");
}

function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function fontMono() {
  return "IBM Plex Mono, SFMono-Regular, Menlo, monospace";
}

function fontSerif() {
  return "Baskerville, Palatino Linotype, Book Antiqua, Times New Roman, serif";
}

function normalizeWikipediaUrl(rawUrl, name) {
  const value = String(rawUrl ?? "").trim();
  if (value) {
    return value;
  }

  const title = String(name ?? "").trim().replaceAll(" ", "_");
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;
}

function buildPersonTooltip(person) {
  const details = [
    `<p class="tooltip-person-years">${escapeText(`${person.born}-${person.died}`)}</p>`
  ];

  if (person.tooltipText) {
    details.push(`<p class="tooltip-person-text">${escapeText(person.tooltipText)}</p>`);
  }

  if (person.placeOfBirth) {
    details.push(`<p class="tooltip-person-meta"><span>Born:</span> ${escapeText(person.placeOfBirth)}</p>`);
  }

  if (person.howDied) {
    details.push(`<p class="tooltip-person-meta"><span>Died:</span> ${escapeText(person.howDied)}</p>`);
  }

  const portraitClass = person.photoPath
    ? "people-card-portrait has-photo tooltip-person-photo"
    : "people-card-portrait tooltip-person-photo";
  const portraitStyle = [];

  if (person.photoPath) {
    portraitStyle.push(`background-image:url('${escapeCssUrl(person.photoPath)}')`);
    portraitStyle.push("background-position:center center");
    portraitStyle.push("background-repeat:no-repeat");
    portraitStyle.push("background-size:cover");
  }

  return `
    <div class="tooltip-person">
      <div
        class="${portraitClass}"
        aria-hidden="true"
        ${portraitStyle.length ? `style="${portraitStyle.join("; ")}"` : ""}
      ></div>
      <div class="tooltip-person-copy">
        <strong>${escapeText(person.name)}</strong>
        ${details.join("")}
      </div>
    </div>
  `;
}

function buildTimelineAnnotationTooltip(person, annotation) {
  const years = `${formatYearLabel(annotation.start)}-${formatYearLabel(annotation.end)}`;
  const detailMarkup = annotation.details
    ? `<p class="tooltip-annotation-detail">${escapeText(annotation.details)}</p>`
    : "";

  return `
    <div class="tooltip-annotation">
      <p class="tooltip-annotation-kind">
        <span class="tooltip-annotation-swatch" style="background:${escapeAttr(annotation.color)}"></span>
        ${escapeText(annotation.label)}
      </p>
      <strong>${escapeText(person.name)}</strong>
      <p class="tooltip-annotation-years">${escapeText(years)}</p>
      ${detailMarkup}
    </div>
  `;
}

function formatYearLabel(year) {
  if (!Number.isFinite(year)) {
    return "";
  }

  const rounded = Math.round(year);
  if (Math.abs(year - rounded) < 0.01) {
    return String(rounded);
  }

  return year.toFixed(2).replace(/\.?0+$/, "");
}

function buildEventImage(event, labelX, labelY) {
  if (!event.image.imagePath) {
    return "";
  }

  const scale = event.image.scale || 1;
  const width = layout.eventImageWidth * scale;
  const height = layout.eventImageHeight * scale;
  const x = labelX + event.image.xPosition;
  const y = labelY + event.image.yPosition;
  const centerX = x + width / 2;
  const centerY = y + height / 2;

  return `
    <g
      class="event-image-wrap"
      style="pointer-events:none"
      transform="rotate(${event.image.angle} ${centerX} ${centerY})"
    >
      <g class="event-image-layer">
        <image
          class="event-image-border"
          href="${escapeAttr(escapeCssUrl(event.image.imagePath))}"
          x="${x}"
          y="${y}"
          width="${width}"
          height="${height}"
          filter="url(#photoBorder)"
          preserveAspectRatio="xMidYMid meet"
        ></image>
        <image
          class="event-image-element"
          href="${escapeAttr(escapeCssUrl(event.image.imagePath))}"
          x="${x}"
          y="${y}"
          width="${width}"
          height="${height}"
          filter="url(#agedPhoto)"
          preserveAspectRatio="xMidYMid meet"
        ></image>
        <rect
          class="event-image-overlay event-image-overlay--wash"
          x="${x}"
          y="${y}"
          width="${width}"
          height="${height}"
          fill="url(#photoWash)"
        ></rect>
        <rect
          class="event-image-overlay event-image-overlay--grain"
          x="${x}"
          y="${y}"
          width="${width}"
          height="${height}"
          fill="url(#photoGrain)"
        ></rect>
      </g>
    </g>
  `;
}

function createLoadRandomSeed() {
  if (globalThis.crypto?.getRandomValues) {
    const values = new Uint32Array(1);
    globalThis.crypto.getRandomValues(values);
    return values[0];
  }

  return Math.floor(Math.random() * 4294967295);
}

function escapeAttr(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("\"", "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeCssUrl(value) {
  return encodeURI(String(value))
    .replaceAll("\"", "%22")
    .replaceAll("'", "%27");
}

function escapeText(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
