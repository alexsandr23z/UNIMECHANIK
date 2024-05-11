import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchTPosts } from "../store/api-action/post-api";
import { sortPosts } from "../store/slices/post-slices";
import Form from "./form";

function Posts() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  const sort = useAppSelector((state) => state.posts.sort);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [formActive, setFormActive] = useState<boolean>(false);
  
  useEffect(() => {
    dispatch(fetchTPosts())
  }, [dispatch]);

  const handleSort = () => {
    if (sort) {
      dispatch(sortPosts(false));
    } else {
      dispatch(sortPosts(true));
    }    
  };

  const handleFormActive = () => {
    setFormActive(true);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="header__block">
        <div className="button__form">
          <button className="button" onClick={handleFormActive}>
            Написать
          </button>
        </div>
        <div className="search">
          <label>
          <input
              className="search__input"
              type="text"
              autoComplete="off"
              name="search__input"
              placeholder="Поиск по сайту"      
              value={searchTerm}
              onChange={handleSearch}    
            />
          </label>
        </div>
      </div>
      {formActive === true && <Form formActive={formActive} setFormActive={setFormActive}></Form>}
      <div className='posts'>
        <ul className='posts__list'>
          {searchTerm.length >= 3 ?
          filteredPosts.map((post) =>
            <li key={post.id} className='posts__item'>
              <h2 className='posts__title' onClick={() => handleSort()}>{post.title}</h2>
              <p className='posts__body'>{post.body}</p>
            </li>
          )
          :
          posts.map((post) =>
            <li key={post.id} className='posts__item'>
              <h2 className='posts__title' onClick={() => handleSort()}>{post.title}</h2>
              <p className='posts__body'>{post.body}</p>
            </li>
          )
        }
        </ul>
      </div>
    </>
  )
}

export default Posts