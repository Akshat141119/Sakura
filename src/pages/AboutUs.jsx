import { motion } from "framer-motion";

export default function AboutUs() {
  const friends = [
    { name: "Aki", trait: "Loyal", treeColor: "#f9d5e5" },
    { name: "Yui", trait: "Joyful", treeColor: "#ffe4e1" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8"
    >
      <h2 className="text-3xl mb-6 text-sakura">Meet Our Blossoms</h2>
      <div className="grid grid-cols-2 gap-6">
        {friends.map((friend, idx) => (
          <motion.div
            key={friend.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="p-4 border rounded-lg hover:bg-sakura transition duration-300"
            style={{ backgroundColor: friend.treeColor }}
          >
            <h3 className="text-2xl">{friend.name}</h3>
            <p>{friend.trait}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}