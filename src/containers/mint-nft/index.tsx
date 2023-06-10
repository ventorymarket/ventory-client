import Banner from "@/components/banner";
import ListItem from "./renderItem";
import { Provider } from "./context";

const MintNFTContainer = () => {
  return (
    <div className="w-full pb-20">
      <Banner />
      <Provider>
        <ListItem />
      </Provider>
    </div>
  );
};

export default MintNFTContainer;
