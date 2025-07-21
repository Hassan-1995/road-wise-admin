// import PathComparisonMap from "../component/PathComparisonMap";
import WrapperPathComparisonMap from "../component/WrapperPathComparisonMap";

type PathComparisonPageProps = {
  params: Promise<{ pathID: string }>;
};

type DropoutAssignment = {
  store: {
    storeName: string;
    latitude: string;
    longitude: string;
  };
};

type DropoutPoint = {
  place: string;
  location: {
    lat: number;
    lng: number;
  };
};

const PathComparisonPage = async ({ params }: PathComparisonPageProps) => {
  const pathID = (await params).pathID;
  const startPoint = { lat: 24.8607, lng: 67.0011 }; // Karachi
  // const endPoint = { lat: 24.8963, lng: 67.0822 }; // Clifton

  // let dropoutPoints: DropoutAssignment[] = []; // <-- initialized to empty
  let dropoutPoints: DropoutPoint[] = []; // <-- initialized to empty

  //
  try {
    const res = await fetch(
      `http://localhost:3000/api/dropout-assignment/${pathID}`,
      {
        cache: "no-store", // helpful to avoid stale data in dev
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data: DropoutAssignment[] = await res.json();
    // console.log("PATH DATA:", data);

    if (data.length > 0) {
      dropoutPoints = data.map((l) => ({
        place: l.store.storeName,
        location: {
          lat: parseFloat(l.store.latitude),
          lng: parseFloat(l.store.longitude),
        },
      }));
      // console.log("Formatted:", dropoutPoints);
    }
  } catch (error) {
    console.error("Error fetching dropout-assignment:", error);
  }

  console.log("End Point: ", dropoutPoints[dropoutPoints.length - 1].location);
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Trip Route Map: {pathID}</h1>
      <div className="w-full max-w-7xl mx-auto p-4 space-y-10">
        <div className="relative w-full aspect-video rounded-xl shadow overflow-hidden">
          {/* <PathComparisonMap
            startPoint={startPoint}
            dropoutPoints={dropoutPoints}
            endPoint={dropoutPoints[dropoutPoints.length - 1].location}
          /> */}
          <WrapperPathComparisonMap
            startPoint={startPoint}
            dropoutPoints={dropoutPoints}
            endPoint={dropoutPoints[dropoutPoints.length - 1].location}
          />
        </div>
      </div>
    </div>
  );
};

export default PathComparisonPage;
