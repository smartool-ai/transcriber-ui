import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';


export default function FileUpload({ uploadTranscriptFile, fileInput }) {
  const onDrop = useCallback(acceptedFiles => {
    // this can support multiple files in the future
    uploadTranscriptFile(acceptedFiles[0].name);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      // add all accepted file extensions here
      "text/plain": [".txt"],
    },
    maxFiles: 1, // for now we only allow one upload at a time
  });

  return (
    <div {...getRootProps()} className="mb-4 h-48 flex justify-center items-center text-gray-400 border-gray-900 border-4 border-dotted rounded-md p-4 hover:border-gray-700">
      <label
        htmlFor="upload"
      >
        <input
          {...getInputProps()}
          type="file"
          id="upload"
          name="upload"
          ref={fileInput}
          className="sr-only"
        />
        {
          isDragActive
            ? <p>Dropping transcript...</p>
            : (<div className="flex flex-col justify-center items-center">
              <p>Drag and drop your transcript here or</p>
              <button className="w-full mt-3 cursor-pointer btn text-sm">Browse</button>
            </div>
            )
        }
      </label>
    </div>
  );
}