import type { Coffee, Guide, BlogPost, ExpertNote } from './types';

export const expertNotes: ExpertNote[] = [
    { id: 'note1', expertName: 'A. Suteja', aroma: 8, body: 7, flavor: 9, acidity: 8, notes: 'Aroma bunga yang kuat dengan sedikit rasa lemon. Sangat jernih dan menyegarkan.', date: '2023-10-26' },
    { id: 'note2', expertName: 'B. Lestari', aroma: 7, body: 8, flavor: 8, acidity: 7, notes: 'Seimbang dengan sentuhan buah beri. Sesuai untuk metode seduh pour-over.', date: '2023-10-25' },
    { id: 'note3', expertName: 'C. Wibowo', aroma: 9, body: 9, flavor: 8, acidity: 6, notes: 'Kaya dan kompleks dengan rasa cokelat hitam dan kacang panggang. Aftertaste yang lama.', date: '2023-09-15' },
    { id: 'note4', expertName: 'D. Indriani', aroma: 7, body: 9, flavor: 7, acidity: 5, notes: 'Body tebal dengan sentuhan tanah dan cedar. Keasaman rendah, sangat halus.', date: '2023-09-10' },
];

export const coffees: Coffee[] = [
  {
    id: 'ethiopian-yirgacheffe',
    name: 'Ethiopian Yirgacheffe',
    origin: 'Yirgacheffe, Ethiopia',
    roast: 'Light',
    flavorProfile: ['Floral', 'Lemon', 'Blueberry', 'Silky'],
    description: 'A bright, clean cup with a complex floral aroma.',
    longDescription: 'Grown in the renowned Yirgacheffe region of Ethiopia, this coffee is a true delight for the senses. Its light roast profile preserves the delicate floral and citrus notes, resulting in a tea-like body and a clean, satisfying finish. Perfect for pour-over methods to highlight its intricate flavors.',
    imageId: 'coffee-2',
    expertNotes: expertNotes.slice(0, 2),
  },
  {
    id: 'colombian-supremo',
    name: 'Colombian Supremo',
    origin: 'Antioquia, Colombia',
    roast: 'Medium',
    flavorProfile: ['Nutty', 'Chocolate', 'Caramel', 'Balanced'],
    description: 'A classic, well-rounded coffee with a smooth finish.',
    longDescription: 'Our Colombian Supremo is the quintessential morning coffee. With a medium roast that brings out notes of toasted nuts and rich chocolate, it offers a balanced and smooth cup that is both comforting and invigorating. It performs exceptionally well in a drip coffee maker or French press.',
    imageId: 'coffee-4',
    expertNotes: [expertNotes[2]],
  },
  {
    id: 'sumatra-mandheling',
    name: 'Sumatra Mandheling',
    origin: 'Sumatra, Indonesia',
    roast: 'Dark',
    flavorProfile: ['Earthy', 'Cedar', 'Dark Chocolate', 'Full-bodied'],
    description: 'A deep, rich coffee with low acidity and a heavy body.',
    longDescription: 'For those who love a bold, intense cup, our Sumatra Mandheling is the perfect choice. This dark roast features a heavy, syrupy body with earthy undertones and a hint of cedar. The low acidity makes it incredibly smooth, with a lingering dark chocolate finish. Ideal for espresso or as a robust drip brew.',
    imageId: 'coffee-1',
    expertNotes: [expertNotes[3]],
  },
  {
    id: 'kenya-aa',
    name: 'Kenya AA',
    origin: 'Nyeri, Kenya',
    roast: 'Medium',
    flavorProfile: ['Blackcurrant', 'Grapefruit', 'Winey', 'Bright'],
    description: 'Intensely aromatic with a vibrant, wine-like acidity.',
    longDescription: 'Kenya AA is celebrated for its complexity and bright, fruity notes. This medium roast boasts a bold blackcurrant flavor, a grapefruit-like citrus zing, and a winey acidity that makes each sip an experience. It\'s a coffee that stands out and is best enjoyed black to appreciate its full spectrum of flavors.',
    imageId: 'coffee-3',
    expertNotes: [],
  },
    {
    id: 'guatemala-antigua',
    name: 'Guatemala Antigua',
    origin: 'Antigua, Guatemala',
    roast: 'Medium',
    flavorProfile: ['Milk Chocolate', 'Toffee', 'Orange', 'Clean'],
    description: 'A sweet and elegant coffee with a velvety body.',
    longDescription: 'From the volcanic soils of Antigua, this coffee is known for its elegant and complex flavor profile. We roast it to a perfect medium to highlight the milk chocolate and toffee sweetness, complemented by a subtle hint of orange acidity. Its clean finish makes it a wonderfully versatile coffee for any brew method.',
    imageId: 'coffee-5',
    expertNotes: [],
  },
  {
    id: 'costa-rica-tarrazu',
    name: 'Costa Rica Tarrazú',
    origin: 'Tarrazú, Costa Rica',
    roast: 'Light',
    flavorProfile: ['Brown Sugar', 'Apricot', 'Crisp', 'Lively'],
    description: 'A crisp and lively cup with a distinct brown sugar sweetness.',
    longDescription: 'The high altitudes of the Tarrazú region produce beans that are dense and full of complex sugars. Our light roast brings out a delightful crispness, with a lively acidity and prominent notes of brown sugar and apricot. It\'s a refreshing and clean coffee, particularly excellent when brewed with an AeroPress or siphon.',
    imageId: 'coffee-6',
    expertNotes: [],
  },
];

export const featuredCoffees = coffees.slice(0, 3);

export const guides: Guide[] = [
  {
    id: 'pour-over',
    title: 'Pour-Over (V60)',
    description: 'Master the V60 for a clean, nuanced cup that highlights a coffee\'s unique flavors.',
    imageId: 'guide-1',
    steps: [
      { title: 'Preparation', instruction: 'Boil water to 205°F (96°C). Weigh 20g of coffee and grind it to a medium-fine consistency, like table salt.' },
      { title: 'Rinse Filter', instruction: 'Place the V60 on your mug, insert the paper filter, and rinse it thoroughly with hot water. This removes paper taste and preheats the brewer. Discard the rinse water.' },
      { title: 'Bloom', instruction: 'Add your ground coffee to the filter. Start a timer and pour 40g of water evenly over the grounds. Let it "bloom" for 30-45 seconds to release CO2.' },
      { title: 'Main Pour', instruction: 'Pour the remaining water in slow, controlled circles, keeping the water level consistent. Aim to finish pouring a total of 320g of water by the 2:30 mark.' },
      { title: 'Drawdown', instruction: 'Allow all the water to filter through the coffee. The total brew time should be around 3 to 3:30 minutes. Remove the brewer and enjoy.' },
    ],
  },
  {
    id: 'french-press',
    title: 'French Press',
    description: 'Achieve a full-bodied, rich brew with this classic immersion method.',
    imageId: 'guide-2',
    steps: [
        { title: 'Preparation', instruction: 'Bring water to a boil and let it cool for 30 seconds (around 200°F/93°C). Weigh 30g of coffee and grind it to a coarse consistency, like breadcrumbs.' },
        { title: 'Add Coffee & Water', instruction: 'Add the ground coffee to your French press. Start a timer and add 500g of hot water, ensuring all grounds are saturated.' },
        { title: 'Steep', instruction: 'Place the plunger on top, but do not press down yet. Let the coffee steep for 4 minutes.' },
        { title: 'Plunge', instruction: 'After 4 minutes, gently and slowly press the plunger all the way down. This separates the grounds from the brewed coffee.' },
        { title: 'Serve', instruction: 'Pour the coffee into your mug immediately to prevent over-extraction. Serve and enjoy the rich, full-bodied flavor.' },
    ],
  },
  {
    id: 'aeropress',
    title: 'AeroPress',
    description: 'A versatile and fast brewer, perfect for a single, clean, and flavorful cup.',
    imageId: 'guide-3',
    steps: [
        { title: 'Preparation', instruction: 'Boil water to 185°F (85°C). Weigh 15g of coffee and grind it to a fine, drip-like consistency. Assemble your AeroPress in the standard orientation with a rinsed filter in the cap.' },
        { title: 'Add Coffee & Water', instruction: 'Place the AeroPress on a sturdy mug. Add your ground coffee. Start a timer and add 220g of water, ensuring all grounds are wet.' },
        { title: 'Stir & Steep', instruction: 'Gently stir the grounds for about 10 seconds. Insert the plunger to create a vacuum and prevent dripping. Let it steep until the timer reads 1:30.' },
        { title: 'Press', instruction: 'Remove the plunger slightly, then press down gently and consistently. Stop when you hear a hissing sound. This should take about 30 seconds.' },
        { title: 'Dilute & Enjoy', instruction: 'You now have a coffee concentrate. You can drink it as is, or add hot water to taste (a 1:1 ratio is a good starting point). Enjoy!' },
    ],
  },
    {
    id: 'cold-brew',
    title: 'Cold Brew',
    description: 'A smooth, low-acid coffee concentrate, perfect for hot days.',
    imageId: 'guide-4',
    steps: [
        { title: 'Preparation', instruction: 'You\'ll need 100g of coffee, ground very coarse. Use a large jar or a dedicated cold brew maker.' },
        { title: 'Combine & Steep', instruction: 'Combine the 100g of coffee grounds with 800g (800ml) of cold, filtered water in your container. Stir gently to ensure all grounds are wet.' },
        { title: 'Wait', instruction: 'Cover the container and let it steep at room temperature for 12-18 hours. The longer it steeps, the stronger the concentrate will be.' },
        { title: 'Filter', instruction: 'After steeping, filter the coffee concentrate to remove the grounds. You can use a fine-mesh sieve lined with cheesecloth, or the filter from your cold brew maker.' },
        { title: 'Serve', instruction: 'Store your concentrate in the fridge for up to two weeks. To serve, dilute with water or milk (a 1:1 or 1:2 ratio is common) and add ice. Enjoy!' },
    ],
  },
];

export const blogPosts: BlogPost[] = [
    {
        id: 'the-origin-of-coffee',
        title: 'The Origin of Coffee: A Journey from Ethiopia to Your Cup',
        author: 'Jane Doe',
        date: '2023-11-01',
        excerpt: 'Discover the legendary tale of Kaldi and his dancing goats, and trace the path of the coffee bean from the highlands of Ethiopia to becoming a global phenomenon.',
        content: 'The story of coffee begins in the ancient coffee forests on the Ethiopian plateau. There, legend says the goat herder Kaldi first discovered the potential of these beloved beans...',
        imageId: 'blog-2',
    },
    {
        id: 'latte-art-basics',
        title: 'Latte Art 101: How to Pour a Perfect Heart',
        author: 'John Smith',
        date: '2023-10-15',
        excerpt: 'Unlock your inner barista! Our step-by-step guide will teach you the fundamentals of steaming milk and pouring your very first piece of latte art.',
        content: 'Latte art may seem intimidating, but with a little practice, you can create beautiful designs. The key lies in two things: perfectly textured milk and a steady hand...',
        imageId: 'blog-1',
    },
];
