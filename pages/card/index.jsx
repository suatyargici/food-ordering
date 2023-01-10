import Image from "next/image";
import Title from "../../components/ui/Title";

const Card = () => {
  return (
    <div className="min-h-[calc(100vh_-_433px)]">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="flex w-full flex-1 items-center overflow-x-auto p-10 md:min-h-[calc(100vh_-_433px)]">
          <table className="w-full min-w-[1000px] text-center text-sm text-gray-500">
            <thead className="bg-gray-700 text-xs uppercase text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  PRODUCT
                </th>
                <th scope="col" className="py-3 px-6">
                  EXTRAS
                </th>
                <th scope="col" className="py-3 px-6">
                  PRICE
                </th>
                <th scope="col" className="py-3 px-6">
                  QUANTITY
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-gray-700 bg-secondary transition-all hover:bg-primary ">
                <td className="flex items-center justify-center gap-x-1 whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                  <Image src="/images/f1.png" alt="" width={50} height={50} />
                  <span>Good Pizza</span>
                </td>
                <td className="whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                  <span>mayonez, acı sos, ketçap,</span>
                </td>
                <td className="whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                  $20
                </td>
                <td className="whitespace-nowrap py-4 px-6 font-medium hover:text-white">
                  1
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex min-h-[calc(100vh_-_433px)] w-full flex-col justify-center bg-secondary p-12 !text-center text-white   md:w-auto md:text-start">
          <Title addClass="text-[40px]">CART TOTAL</Title>

          <div className="mt-6">
            <b>Total: </b>$20
          </div>

          <div>
            <button className="btn-primary mt-4 w-52 md:w-auto">
              CHECKOUT NOW!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
