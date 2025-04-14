import { useState } from "react";

type Config = {
  pagination: string;
  timer: boolean;
  timerDuration: number;
  shuffle: boolean;
};

export default function ConfigForm({ onSubmit }: { onSubmit: (config: Config) => void }) {
  const [config, setConfig] = useState<Config>({
    pagination: "1/question",
    timer: true,
    timerDuration: 5,
    shuffle: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type, checked } = e.target as HTMLInputElement;
    setConfig((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : id === "timerDuration" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(config);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="pagination" className="block font-medium">Pagination</label>
        <select
          id="pagination"
          className="w-full p-2 border rounded-md"
          value={config.pagination}
          onChange={handleChange}
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
            checked={config.timer}
            onChange={handleChange}
          />
          Enable Timer
        </label>
        {config.timer && (
          <div className="mt-2">
            <label htmlFor="timerDuration" className="block font-medium">Timer Duration (minutes)</label>
            <input
              id="timerDuration"
              type="number"
              className="w-full p-2 border rounded-md"
              value={config.timerDuration}
              min={1}
              onChange={handleChange}
            />
          </div>
        )}
      </div>
      <div>
        <label htmlFor="shuffle" className="block font-medium flex items-center gap-2">
          <input
            id="shuffle"
            type="checkbox"
            checked={config.shuffle}
            onChange={handleChange}
          />
          Shuffle
        </label>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 cursor-pointer"
      >
        Start Test
      </button>
    </form>
  );
}
