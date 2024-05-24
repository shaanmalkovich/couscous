// src/components/GroceryList.tsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

interface Item {
  id: string;
  name: string;
}

const GroceryList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'grocery-list'), (snapshot) => {
      const itemsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Item));
      setItems(itemsData);
    });
    return () => unsubscribe();
  }, []);

  const addItem = async () => {
    if (newItem) {
      await addDoc(collection(db, 'grocery-list'), { name: newItem });
      setNewItem('');
    }
  };

  const removeItem = async (id: string) => {
    await deleteDoc(doc(db, 'grocery-list', id));
  };

  return (
    <div>
      <h2>Grocery List</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Add new item" />
      <button onClick={addItem}>Add Item</button>
    </div>
  );
};

export default GroceryList;
