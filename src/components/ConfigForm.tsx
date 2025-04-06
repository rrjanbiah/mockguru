import { useState } from "react";

type Config = {
  pagination: string;
  timer: boolean;
  showAnswers: string;
  shuffle: boolean;
};

export default function ConfigForm({ onSubmit }: { onSubmit: (config: Config) => void }) {
  const [pagination, setPagination] = useState("1/question");
  const [timer, setTimer] = useState(false);
  const [showAnswers, setShowAnswers] = useState("never");
  const [shuffle, setShuffle] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ pagination, timer, showAnswers, shuffle });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <label className="block font-medium">Pagination</label>
        <select
          className="w-full p-2 border rounded-md"
          value={pagination}
          onChange={(e) => setPagination(e.target.value)}
        >
          <option value="1/question">1/question</option>
          <option value="5/group">5/group</option>
          <option value="10/group">10/group</option>
          <option value="section-wise">Section-wise</option>
        </select>
      </div>
      <div>
        <label className="block font-medium">Timer</label>
        <input
          type="checkbox"
          className="mr-2"
          checked={timer}
          onChange={(e) => setTimer(e.target.checked)}
        />
        Enable Timer
      </div>
      <div>
        <label className="block font-medium">Show Answers</label>
        <select
          className="w-full p-2 border rounded-md"
          value={showAnswers}
          onChange={(e) => setShowAnswers(e.target.value)}
        >
          <option value="after each">After Each</option>
          <option value="at end">At End</option>
          <option value="never">Never</option>
        </select>
      </div>
      <div>
        <label className="block font-medium">Shuffle Questions</label>
        <input
          type="checkbox"
          className="mr-2"
          checked={shuffle}
          onChange={(e) => setShuffle(e.target.checked)}
        />
        Shuffle
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Start Test
      </button>
    </form>
  );
}
