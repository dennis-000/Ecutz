import { faqs } from '../../assets/data/faqs';
import FaqItem from './FaqItem';

// Define the FaqList functional component
// More of JS needed
const FaqList = () => {
  return (

      // Render an unordered list to hold the FAQ items == NOT NUMBERING THEM
    <ul className='mt-[38px]'>
      {/* Map through each item in the faqs array that's my faqs.js data */}
      {faqs.map((item, index) => (
        // Render an FaqItem for each item in the faqs array
        // Passing the item as a prop and using the index as a key
        <FaqItem item={item} key={index} />
      ))}
    </ul>
  );
};

export default FaqList