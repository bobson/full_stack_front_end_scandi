import { Component } from "react";
import { Link } from "react-router-dom";

interface PageNotFoundProps {
  message: string | undefined;
}

export default class PageNotFound extends Component<PageNotFoundProps> {
  render() {
    const { message } = this.props;
    return (
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <p className="mt-6 text-base leading-7 text-gray-600">{message}</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="w-full bg-green-500 disabled:opacity-50
               disabled:scale-100 disabled:hover:shadow-none text-white 
               font-medium py-3 mb-4 hover:shadow-lg active:scale-95"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    );
  }
}
