import { Link } from "react-router-dom";
import Layout from "../Layout";

const AboutUs = () => {
  return (
    <Layout mainClassname="max-w-screen-md mx-auto">
      <div className=" p-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          ჩვენ შესახებ
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            ჩვენი მისია
          </h2>
          <p className="text-gray-700 leading-relaxed">
            კეთილი იყოს თქვენი მობრძანება ადგილობრივ რეკომენდაციებში! ჩვენი
            პლატფორმა აძლევს მომხმარებლებს საშუალებას, გააზიარონ თავიანთი
            გამოცდილება, რეკომენდაციები და შეხედულებები სხვადასხვა ობიექტების
            შესახებ.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            როგორ მუშაობს
          </h2>
          <ul className="list-disc list-inside text-gray-700 flex flex-col gap-2">
            <li>
              <strong>გამოიკვლიეთ და აღმოაჩინეთ:</strong> აღმოაჩინეთ ახალი
              ადგილები და საზოგადოების მიერ რეკომენდებული სერვისები. ჩვენი
              პლატფორმა დაგეხმარებათ იპოვოთ კარგი შეფასების ობიექტები.
            </li>
            {/* <li>
              <strong>წვლილი შეიტანეთ და გააზიარეთ:</strong> დატოვეთ კომენტარები
              და გამოხატეთ ემოციები ამა თუ იმ ობიექტზე. თქვენი ჩართულობა სხვას
              ეხმარება ინფორმაციის მიღებაში.
            </li> */}
            <li>
              <strong>სახოგადოების ჩართულობა:</strong> განიხილეთ თქვენი
              საყვარელი ადგილები, გაცვალეთ რეკომენდაციები.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            კონტაქტი
          </h2>
          <p className="text-gray-700 leading-relaxed">
            გაქვთ შეკითხვები, წინადადებები ან გსურთ გამოხმაურება?{" "}
            <Link to="/contact" className="text-blue-600 underline">
              დაგვიკავშირდით
            </Link>
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default AboutUs;
