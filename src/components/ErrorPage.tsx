import { Component } from "react";

interface ErrorComponentProps {
  message: string;
}

export default class ErrorPage extends Component<ErrorComponentProps> {
  render() {
    const { message } = this.props;
    return (
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h2 className="font-semibold text-xl text-red-600">Error:</h2>
          <h3 className="mt-4 text-l font-bold tracking-tight text-gray-900">
            {message}
          </h3>
        </div>
      </main>
    );
  }
}
