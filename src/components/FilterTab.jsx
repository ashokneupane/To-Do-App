import { Link } from "react-router-dom"

export default function FilterTab({filter}){
    return(
        <>
         <ul className="flex flex-wrap text-sm font-medium text-gray-500 justify-center">
                  <li className="me-2">
                    <Link
                      to="/all"
                      className={`p-4 inline-block ${
                        filter == "" || filter == "all"
                          ? "bg-gray-100 active text-blue-600"
                          : ""
                      }`}
                    >
                      All
                    </Link>
                  </li>
                  <li className="me-2">
                    <Link
                      to="/pending"
                      className={`p-4 inline-block ${
                        filter == "pending" ? "bg-gray-100 active text-blue-600" : ""
                      }`}
                    >
                      Pending
                    </Link>
                  </li>
                  <li className="me-2">
                    <Link
                      to="/completed"
                      className={`p-4 inline-block ${
                        filter == "completed" ? "bg-gray-100 active text-blue-600" : ""
                      }`}
                    >
                      Completed
                    </Link>
                  </li>
                </ul>
        </>
    )
}