import { useState } from "react";

type Config = {
  pagination: string;
  timer: boolean;
  timerDuration: number; // Added timer duration
  showAnswers: string;
  shuffle: boolean;
};

export default function ConfigForm({ onSubmit }: { onSubmit: (config: Config) => void }) {
  const [pagination, setPagination] = useState("1/question");
  const [timer, setTimer] = useState(false);
  const [timerDuration, setTimerDuration] = useState(5); // Default to 5 minutes
  const [showAnswers, setShowAnswers] = useState("never");
  const [shuffle, setShuffle] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ pagination, timer, timerDuration, showAnswers, shuffle });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="pagination" className="block font-medium">Pagination</label>
        <select
          id="pagination"
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
        <label htmlFor="timer" className="block font-medium flex items-center gap-2">
          <input
            id="timer"
            type="checkbox"
            checked={timer}
            onChange={(e) => setTimer(e.target.checked)}
          />
          Enable Timer
        </label>
        {timer && (
          <div className="mt-2">
            <label htmlFor="timerDuration" className="block font-medium">Timer Duration (minutes)</label>
            <input
              id="timerDuration"
              type="number"
              className="w-full p-2 border rounded-md"
              value={timerDuration}
              min={1}
              onChange={(e) => setTimerDuration(Number(e.target.value))}
            />
          </div>
        )}
      </div>
      <div>
        <label htmlFor="showAnswers" className="block font-medium">Show Answers</label>
        <select
          id="showAnswers"
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
        <label htmlFor="shuffle" className="block font-medium flex items-center gap-2">
          <input
            id="shuffle"
            type="checkbox"
            checked={shuffle}
            onChange={(e) => setShuffle(e.target.checked)}
          />
          Shuffle
        </label>
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
